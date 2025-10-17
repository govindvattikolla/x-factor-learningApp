import express from "express";
import Course from "../models/Courses.js";
import {deleteFromS3, upload} from "../config/s3Config.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";
import s3Service from "../service/S3Service.js";

const router = express.Router();

router.post("/api/admin/course/add", upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), async (req, res) => {
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    const session = await mongoose.startSession();

    const cleanupFiles = async () => {
        if (videoFile) await deleteFromS3(videoFile.key);
        if (thumbnailFile) await deleteFromS3(thumbnailFile.key);
    };

    try {
        session.startTransaction();
        const {title, description, price} = req.body;
        const userID = req.sessionData._id;

        if (!title || !description || !price || !videoFile || !thumbnailFile) {
            await cleanupFiles();
            return res.status(400).json({error: "All fields, including video and thumbnail, are required"});
        }

        const existingCourse = await Course.findOne({title});
        if (existingCourse) {
            await cleanupFiles();
            return res.status(400).json({error: "A course with this title already exists"});
        }

        const newCourse = new Course({
            title,
            description,
            price,
            thumbnailId: thumbnailFile.key,
            addedBy: userID
        });
        const savedCourse = await newCourse.save();


        const newVideo = new Video({
            title: `${title} - Introduction`,
            courseId: savedCourse._id,
            videoSource: 's3',
            key: videoFile.key,
            addedBy: userID
        });
        await newVideo.save();

        console.log("Course and initial video added successfully:", savedCourse);
        await session.commitTransaction();
        res.status(201).json({message: "Course added","id":savedCourse.id});

    } catch (error) {
        console.error("Error adding course:", error);
        await cleanupFiles();
        await session.abortTransaction();
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/api/admin/course", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [courses, total] = await Promise.all([
            Course.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Course.countDocuments(),
        ]);

        const result = await Promise.all(
            courses.map(async (course) => {
                const obj = course.toObject();
                if (obj.thumbnailId) {
                    obj.thumbnailUrl = await s3Service.getImageUrl(obj.thumbnailId);
                    delete obj.thumbnailId;
                }

                if (obj.videos && obj.videos.length) {
                    obj.videos = await Promise.all(
                        obj.videos.map(async (video) => {
                            if (video.thumbnail) {
                                video.thumbnail = await s3Service.getImageUrl(video.thumbnail);
                            }
                            return video;
                        })
                    );
                }

                return obj;
            })
        );

        res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: result,
        });
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;