import express from "express";
import Course from "../models/Courses";

const router = express.Router();

// Add a new course
router.post("/add", async (req, res) => {
    try {
        console.log("📌 Incoming Course Data:", req.body);  // Debugging log
        
        const { title, description, price, image } = req.body;

        // Check for missing fields
        if (!title || !description || !price || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check for duplicate title
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(400).json({ error: "Course with this title already exists" });
        }

        // Create new course
        const newCourse = new Course({ title, description, price, image });
        await newCourse.save();
        
        console.log("✅ Course Added Successfully:", newCourse);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("❌ Error adding course:", error);  // Log the exact error
        res.status(500).json({ error: "Internal server error" });
    }
});

// fetch all course
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = router;
