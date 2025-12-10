import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from "path";

const s3Client = new S3Client({
    region: "blr1",
    endpoint: "https://blr1.digitaloceanspaces.com",
    forcePathStyle: false,
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.DO_SPACES_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = `${Date.now()}`;
            const extension = path.extname(file.originalname);

            if (file.fieldname === 'video') {
                cb(null, `course-videos/${fileName}${extension}`);
            }
            else if (
                file.fieldname === 'thumbnail' ||
                file.fieldname === 'video_thumbnail'
            ) {
                cb(null, `course-thumbnails/${fileName}${extension}`);
            }
            else if (file.fieldname === 'profile') {
                cb(null, `profile/${fileName}${extension}`);
            }
            else {
                cb(null, `uploads/${fileName}${extension}`);
            }
        }
    }),
    limits: { fileSize: 500 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            const videoTypes = /mp4|mov|avi|mkv|webm/;
            if (videoTypes.test(file.originalname.toLowerCase())) {
                return cb(null, true);
            }
            return cb(new Error('Only video files are allowed'));
        }

        if (
            file.fieldname === 'thumbnail' ||
            file.fieldname === 'profile'
        ) {
            const imageTypes = /jpg|jpeg|png|gif|webp/;
            if (imageTypes.test(file.originalname.toLowerCase())) {
                return cb(null, true);
            }
            return cb(new Error('Only image files are allowed'));
        }

        cb(null, true);
    }
});

const deleteFromS3 = async (fileKey) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: fileKey
    });

    try {
        await s3Client.send(command);
        console.log(`✅ Deleted file from DigitalOcean: ${fileKey}`);
        return true;
    } catch (error) {
        console.error('❌ Error deleting from DO Spaces:', error);
        return false;
    }
};

export { upload, deleteFromS3 ,s3Client };