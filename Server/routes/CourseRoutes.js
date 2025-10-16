import express from "express";
import Course from "../models/Courses.js";
import {deleteFromS3, upload} from "../config/s3Config.js";

const router = express.Router();

router.post("/add", upload.fields([
    {name: 'video', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), async (req, res) => {
    const videoFile = req.files?.video?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    const cleanupFiles = async () => {
        if (videoFile) await deleteFromS3(videoFile.key);
        if (thumbnailFile) await deleteFromS3(thumbnailFile.key);
    };

    try {
        const {title, description, price} = req.body;
        const userID = req.sessionData._id;

        if (!title || !description || !price) {
            await cleanupFiles();
            return res.status(400).json({error: "Title, description, and price are required"});
        }

        if (!videoFile) {
            if (thumbnailFile) await deleteFromS3(thumbnailFile.key);
            return res.status(400).json({error: "A video file is required"});
        }

        if (!thumbnailFile) {
            if (videoFile) await deleteFromS3(videoFile.key);
            return res.status(400).json({error: "A thumbnail image is required"});
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
            thumbnail: thumbnailFile.location,
            key: thumbnailFile.key,
            videoPublicId: videoFile.key,
            videoSource: 's3',
            addedBy: userID
        });

        await newCourse.save();

        console.log("✅ Course Added Successfully:", newCourse);
        res.status(201).json(newCourse);

    } catch (error) {
        console.error("❌ Error adding course:", error);
        await cleanupFiles();
        res.status(500).json({error: "Internal server error"});
    }
});

// router.get("/", async (req, res) => {
//     try {
//         const courses = await Course.find({});
//         res.json(courses);
//     } catch (error) {
//         console.error("Error fetching courses:", error);
//         res.status(500).json({error: "Internal server error"});
//     }
// });

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: "Course not found"});
        res.json(course);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message: "Server error"});
    }
});


export default router;
