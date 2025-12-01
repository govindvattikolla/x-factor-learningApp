import express from "express";
import Course from "../models/Course.js";
import {deleteFromS3, upload} from "../config/s3Config.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";
import s3Service from "../service/S3Service.js";
import Purchase from "../models/Purchase.js";
import UserProgress from "../models/UserProgress.js";

const router = express.Router();

router.post("/api/admin/course/add", upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount: 1},
    {name: 'video_thumbnail', maxCount: 1},
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

        if (!title || !description || !price || !videoFile || !thumbnailFile || !videoThumbnail) {
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
            thumbnail: videoThumbnail.key,
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

router.get("/api/user/course", async (req, res) => {
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
                delete obj.updatedAt;
                delete obj.__v;
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

        if (course) {
            const imageUrl = await s3Service.getImageUrl(course.thumbnailId);
            const videos = await Video.find({
                courseId: courseId
            });

            const modifiedVideos = [];
            for (const video of videos) {
                const imageUrl = await s3Service.getImageUrl(video.thumbnail);
                const singedUrl = await s3Service.getPresignedUrl(video.key);
                modifiedVideos.push({
                    id: video._id,
                    title: video.title,
                    url: singedUrl,
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
                videos: modifiedVideos
            };
            return res.status(200).json(courseResponse);
        } else {
            return res.status(404).json({message: "Course not found"});
        }
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.get("/api/user/course/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.sessionData.id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({error: "Course not found"});
        let purchased = false;
        if (userId) {
            const buyCheck = await Purchase.findOne({userId, courseID: courseId});
            console.log(buyCheck);
            purchased = !!buyCheck;
        }
        const videos = await Video.find({courseId});
        const modifiedVideos = [];

        for (const v of videos) {
            const thumbnailUrl = await s3Service.getImageUrl(v.thumbnail);

            let videoUrl = "LOCKED";

            if (purchased) {
                videoUrl = await s3Service.getPresignedUrl(v.key);
            }

            const progress = await UserProgress.findOne({
                userId,
                courseId,
                videoId: v._id
            });

            modifiedVideos.push({
                id: v._id,
                title: v.title,
                thumbnailUrl,
                url: videoUrl,
                watchedPercentage: progress?.watchedPercentage || 0,
                isCompleted: progress?.isCompleted || false,
                lastWatchedAt: progress?.lastWatchedAt || 0
            });
        }

        const totalVideos = videos.length;
        const completedVideos = await UserProgress.countDocuments({
            userId,
            courseId,
            isCompleted: true
        });

        const completionPercentage = totalVideos ? Math.round((completedVideos / totalVideos) * 100) : 0;


        return res.json({
            course: {
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                thumbnailUrl: await s3Service.getImageUrl(course.thumbnailId),
                completionPercentage
            },
            videos: modifiedVideos,
            purchased,
        });


    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({error: "Internal server error"});
    }
});

router.put("/api/user/course/progress/update", async (req, res) => {
    try {
        const {courseId, videoId, watchedPercentage, lastWatchedAt} = req.body;
        const userId = req.sessionData?.id;

        if (!userId) return res.status(401).json({error: "Unauthorized"});

        const progress = await UserProgress.findOneAndUpdate(
            {userId, courseId, videoId},
            {
                watchedPercentage,
                lastWatchedAt,
                isCompleted: watchedPercentage >= 90
            },
            {new: true, upsert: true}
        );

        return res.json({success: true, progress});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
});


router.get("/api/user/my-courses", async (req, res) => {
    try {
        const userId = req.sessionData?.id;
        const purchases = await Purchase.find({
            userId: userId,
        }).populate("courseID");

        const purchasesWithImages = await Promise.all(purchases.map(async (purchase) => {
            const purchaseObj = purchase.toObject();

            if (purchaseObj.courseID && purchaseObj.courseID.thumbnailId) {
                purchaseObj.courseID.thumbnailUrl = await s3Service.getImageUrl(purchaseObj.courseID.thumbnailId);
            }
            return purchaseObj;
        }));

        return res.json({ purchases: purchasesWithImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;