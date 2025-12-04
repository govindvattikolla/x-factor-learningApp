import express from "express";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import CourseProgress from "../models/CourseProgress.js";

const router = express.Router();

router.post("/api/user/course/:id/buy", async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.sessionData.id;

        const { paymentMethod } = req.body;

        if (!paymentMethod) {
            return res.status(400).json({ error: "Payment method required" });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const already = await Purchase.findOne({ courseID: courseId, userId });
        if (already) {
            return res.status(400).json({ error: "Course already purchased" });
        }

        await CourseProgress.create({
            courseId: courseId,
            userId: userId,
            isCompleted: false,
            totalVideos:course.totalVideos
        });

        await Purchase.create({
            userId,
            courseID: courseId,
            paymentMethod,
        });

        return res.json({ message: "Course purchased successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/api/user/me", async (req, res) => {
    try {
        if (!req.sessionData || !req.sessionData.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.sessionData.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
