import cron from "node-cron";
import fs from "fs";
import {exec} from "child_process";
import path from "path";
import Video from "../models/Video.js";
import {s3Client} from "../config/s3Config.js";
import {GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";

const LOCAL_TMP_PATH = "/tmp/video-transcode";

if (!fs.existsSync(LOCAL_TMP_PATH)) {
    fs.mkdirSync(LOCAL_TMP_PATH, {recursive: true});
}

async function downloadFromS3(key, localPath) {
    console.log(`📥 Downloading from Spaces: ${key}`);

    const command = new GetObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key
    });

    const fileStream = await s3Client.send(command);

    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(localPath);
        fileStream.Body.pipe(writeStream)
            .on("finish", resolve)
            .on("error", reject);
    });
}

async function uploadToS3(filePath, key) {
    console.log(`☁ Uploading: ${key}`);

    const fileData = fs.readFileSync(filePath);
    const uploadCommand = new PutObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: key,
        ACL: "private",
        Body: fileData,
        ContentType: filePath.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t",
    });

    await s3Client.send(uploadCommand);
}

cron.schedule("*/1 * * * *", async () => {
    console.log("🔍 Checking for videos to process...");

    const video = await Video.findOne({status: "queued"});
    if (!video) return console.log("🎉 No pending videos");

    console.log(`🚀 Processing video ${video._id}`);
    await Video.updateOne({_id: video._id}, {status: "processing"});

    const localSource = `${LOCAL_TMP_PATH}/source-${video._id}.mp4`;
    const outputFolder = `${LOCAL_TMP_PATH}/out-${video._id}`;

    if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

    try {
        await downloadFromS3(video.rawVideoKey, localSource);

        const ffmpegCmd = `ffmpeg -i ${localSource} -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a aac -ar 48000 -b:a 128k -c:v h264 -profile:v main -crf 20 -g 48 -sc_threshold 0 -hls_time 4 -hls_playlist_type vod -hls_segment_filename "${outputFolder}/segment_%03d.ts" ${outputFolder}/master.m3u8`;

        console.log("🎞 Running FFmpeg...");
        await new Promise((resolve, reject) => {
            exec(ffmpegCmd, (err, stdout, stderr) => {
                if (err) {
                    console.error(stderr);
                    return reject(err);
                }
                resolve();
            });
        });

        console.log("🔥 FFmpeg transcoding completed");
        const baseKey = `processed/courses/${video._id}`;

        const files = fs.readdirSync(outputFolder);
        for (const fileName of files) {
            await uploadToS3(
                path.join(outputFolder, fileName),
                `${baseKey}/${fileName}`
            );
        }

        console.log("☁ Uploaded all HLS files");
        await Video.updateOne(
            {_id: video._id},
            {
                hlsPath: `${baseKey}/master.m3u8`,
                status: "ready",
            }
        );

        console.log("🎉 Video ready for streaming");
        fs.rmSync(localSource, {force: true});
        fs.rmSync(outputFolder, {recursive: true, force: true});

    } catch (err) {
        console.error("❌ Error during processing:", err);
        await Video.updateOne({_id: video._id}, {status: "failed"});
    }
});

console.log("🛠 Cron Transcoder Worker started");