import express from "express";
import Course from "../models/Courses.js";
import {deleteFromS3, upload} from "../config/s3Config.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";
import s3Service from "../service/S3Service.js";

const router = express.Router();

router.post("/api/admin/course/add", upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount: 1},
    {name : 'video_thumbnail', maxCount: 1},
]), async (req, res) => {
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    const thumbnailFiles = req.files?.video_thumbnail;
    const videoThumbnail = (Array.isArray(thumbnailFiles) && thumbnailFiles.length > 0) ? thumbnailFiles[0] : undefined;
    const session = await mongoose.startSession();

    const cleanupFiles = async () => {
        if (videoFile) await deleteFromS3(videoFile.key);
        if (thumbnailFile) await deleteFromS3(thumbnailFile.key);
    };

    try {
        session.startTransaction();
        const {title, description, price} = req.body;
        const userID = req.sessionData._id;

        if (!title || !description || !price || !videoFile || !thumbnailFile || !videoThumbnail ) {
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
            thumbnail:videoThumbnail.key,
            videoSource: 's3',
            key: videoFile.key,
            addedBy: userID
        });
        await newVideo.save();

        console.log("Course and initial video added successfully:", savedCourse);
        await session.commitTransaction();
        res.status(201).json({message: "Course added", "id": savedCourse.id});
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
                .sort({createdAt: -1})
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
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/api/admin/course/:id", async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findOne({
            _id: courseId
        });

        if(course){
            const imageUrl = await s3Service.getImageUrl(course.thumbnailId);
            const videos=await Video.find({
                courseId: courseId
            });

            const modifiedVideos=[];
            for(const video of videos){
                const imageUrl = await s3Service.getImageUrl(video.thumbnail);
                const singedUrl=await s3Service.getPresignedUrl(video.key);
                modifiedVideos.push({
                    id: video._id,
                    title: video.title,
                    url:singedUrl,
                    thumbnailUrl: imageUrl,
                });
            }

            const courseResponse = {
                id: course.get("_id"),
                title: course.get("title"),
                description: course.get("description"),
                price: course.get("price"),
                createdAt: course.get("createdAt"),
                updatedAt: course.get("updatedAt"),
                thumbnailUrl: imageUrl,
                videos:modifiedVideos
            };
            return res.status(200).json(courseResponse);
        }else {
            return res.status(404).json({message: "Course not found"});
        }
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({error: "Internal server error"});
    }
})

export default router;