import express from "express";
import Session from "../models/Session.js";
import Student from "../models/Students.js";
import Course from "../models/Courses.js";

const SessionRouter = express.Router();

SessionRouter.post("/add", async (req, res) => {
    try {

        const {title, timestamp, courseId, description, recordingUrl, status} = req.body;

        if (!title || !timestamp || !courseId || !description || !status) {
            return res.status(400).json({error: "All fields except Recording URL are required"});
        }

        const newSession = new Session({
            title,
            timestamp,
            courseId,
            description,
            recordingUrl: recordingUrl || "",
            status,
        });

        await newSession.save();
        console.log("✅ Session Added:", newSession);
        res.status(201).json({message: "Session added successfully", session: newSession});

    } catch (error) {
        console.error("❌ Error adding session:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


SessionRouter.get("/course/:courseId", async (req, res) => {
    try {
        const {courseId} = req.params;
        const sessions = await Session.find({courseId}).populate("courseId", "title"); // Populating course title
        res.status(200).json(sessions);
    } catch (error) {
        console.error("Error fetching sessions by course:", error);
        res.status(500).json({error: "Error fetching sessions"});
    }
});


SessionRouter.put("/:id", async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!session) {
            return res.status(404).json({message: "Session not found"});
        }

        res.status(200).json(session);
    } catch (error) {
        console.error("❌ Error updating session:", error);
        res.status(500).json({message: "Internal server error"});
    }
});


SessionRouter.get("/", async (req, res) => {
    try {
        const sessions = await Session.find().populate("courseId", "title description");
        const groupedSessions = {};

        // Group sessions by course
        sessions.forEach((session) => {
            const courseTitle = session.courseId?.title || "Unknown Course";
            if (!groupedSessions[courseTitle]) {
                groupedSessions[courseTitle] = [];
            }
            groupedSessions[courseTitle].push(session);
        });

        res.status(200).json(groupedSessions);
    } catch (error) {
        console.error("❌ Error fetching sessions:", error);
        res.status(500).json({error: "Error fetching sessions"});
    }
});


SessionRouter.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({error: "Student not found"});

        res.status(200).json({message: "Student deleted successfully"});
    } catch (error) {
        console.error("❌ Error deleting student:", error);
        res.status(500).json({error: "Error deleting student"});
    }
});

SessionRouter.put("/api/students/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedStudent) return res.status(404).json({error: "Student not found"});

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("❌ Error updating student:", error);
        res.status(500).json({error: "Error updating student"});
    }
});

SessionRouter.get("/api/courses/:id/sessions", async (req, res) => {
    try {
        console.log("Fetching sessions for Course ID:", req.params.id);

        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }

        const sessions = await Session.find({courseId: req.params.id});

        res.json({course, sessions});
    } catch (error) {
        console.error("Error fetching course sessions:", error);
        res.status(500).json({message: "Server error"});
    }
});


SessionRouter.delete("/:id", async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({error: "Session not found"});
        }
        res.status(200).json({message: "Session deleted successfully"});
    } catch (error) {
        console.error("❌ Error deleting session:", error);
        res.status(500).json({error: "Error deleting session"});
    }
});

export default SessionRouter;
