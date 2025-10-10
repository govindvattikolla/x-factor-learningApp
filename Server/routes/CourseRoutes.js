import express from "express";
import Course from "../models/Courses.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const {title, description, price, image} = req.body;
        const userID= req.sessionData._id;

        if (!title || !description || !price || !image) {
            return res.status(400).json({error: "All fields are required"});
        }

        const existingCourse = await Course.findOne({title});
        if (existingCourse) {
            return res.status(400).json({error: "Course with this title already exists"});
        }

        const newCourse = new Course({title, description, price, image ,userID });
        await newCourse.save();

        console.log("✅ Course Added Successfully:", newCourse);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("❌ Error adding course:", error);
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
