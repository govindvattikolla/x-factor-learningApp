import express from "express";
import CourseProgress from "../models/CourseProgress.js";
import mongoose from "mongoose";
import s3Service from "../service/S3Service.js";

const DashboardRoute = express.Router();

DashboardRoute.get("/api/user/dashboard", async (req, res) => {
    try {
        const userID = req.sessionData.id;

        const courseProgress = await CourseProgress.find({
            userId: userID
        }).populate("courseId");

        const courses=[];
        for (const course of courseProgress) {
            let progressPercentage = 0;
            if (course.totalVideos > 0) {
                progressPercentage = Math.round((course.completedVideos / course.totalVideos) * 100);
            }
            courses.push({
                id: course.courseId.id,
                isCompleted: course.isCompleted,
                completedVideos:course.completedVideos,
                totalVideos:course.totalVideos,
                progress: progressPercentage,
                thumbnail:await s3Service.getImageUrl(course.courseId.thumbnailId),
                title: course.courseId.title,
                description: course.courseId.description,
            });
        }

        const result = await CourseProgress.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userID)
                }
            },
            {
                $group: {
                    _id: null,
                    totalEnrolledCourses: { $sum: 1 },
                    totalCompletedCourses: {
                        $sum: { $cond: ["$isCompleted", 1, 0] }
                    },
                    totalVideos: { $sum: "$totalVideos" },
                    totalCompletedVideos: { $sum: "$completedVideos" }
                }
            }
        ]);

        const stats = result.length > 0 ? result[0] : {
            totalEnrolledCourses: 0,
            totalCompletedCourses: 0,
            totalVideos: 0,
            totalCompletedVideos: 0
        };

        return res.json({courses,stats});

    } catch (e) {
        console.error(e);
        return res.status(500).json({message:'internal server error'});
    }
});

export default DashboardRoute;