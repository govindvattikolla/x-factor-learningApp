import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
import { encrypt } from "./EncryptionService.js";

class S3Service {
    constructor() {
        this.s3 = new S3Client({
            region: "blr1",
            endpoint: "https://blr1.digitaloceanspaces.com",
            forcePathStyle: false,
            credentials: {
                accessKeyId: process.env.DO_SPACES_KEY,
                secretAccessKey: process.env.DO_SPACES_SECRET,
            },
        });

        this.bucket = process.env.DO_SPACES_BUCKET; // your Space name
    }

    async uploadFile(filePath, key, contentType = "application/octet-stream") {
        const fileStream = fs.createReadStream(filePath);

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: fileStream,
            ContentType: contentType,
            ACL: "public-read",
        });

        await this.s3.send(command);

        fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete local file ${filePath}:`, err);
            else console.log(`Deleted local file: ${filePath}`);
        });

        return key;
    }

    async listFiles(prefix) {
        const command = new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: prefix,
        });
        const data = await this.s3.send(command);
        return data.Contents || [];
    }

    async getPresignedUrl(key, expiresIn = 60 * 5) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        return await getSignedUrl(this.s3, command, { expiresIn });
    }

    async getImageUrl(key) {
        const localDir = path.resolve("uploads");
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        const filePath = path.join(localDir, key.replace(/\//g, "_"));

        if (fs.existsSync(filePath)) {
            return encrypt(key.replace(/\//g, "_"));
        }

        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        const response = await this.s3.send(command);
        const stream = response.Body;

        await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);
            stream.pipe(writeStream);
            stream.on("error", reject);
            writeStream.on("finish", resolve);
        });

        return encrypt(key.replace(/\//g, "_"));
    }
}

export default new S3Service();