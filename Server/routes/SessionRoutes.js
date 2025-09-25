const express = require("express");
const router = express.Router();
const Session = require("../models/Session");


// Add new session
router.post("/add", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // ✅ Debugging log

        const { title, timestamp, courseId, description, recordingUrl, status } = req.body;

        if (!title || !timestamp || !courseId || !description || !status) {
            return res.status(400).json({ error: "All fields except Recording URL are required" });
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
        console.log("✅ Session Added:", newSession); // ✅ Debugging log
        res.status(201).json({ message: "Session added successfully", session: newSession });

    } catch (error) {
        console.error("❌ Error adding session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Get sessions by course ID
router.get("/course/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params;
        const sessions = await Session.find({ courseId }).populate("courseId", "title"); // Populating course title
        res.status(200).json(sessions);
    } catch (error) {
        console.error("Error fetching sessions by course:", error);
        res.status(500).json({ error: "Error fetching sessions" });
    }
});


router.put("/:id", async (req, res) => {
    try {
      const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      res.status(200).json(session);
    } catch (error) {
      console.error("❌ Error updating session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
