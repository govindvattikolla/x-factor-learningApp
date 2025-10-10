import configureMulter from "../service/configureMulter.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentImageUpload = configureMulter("./uploads/students/images");
const sessionImageUpload = configureMulter("./uploads/sessions/images");
const courseImageUpload = configureMulter("./uploads/courses/images");

const router = express.Router();

router.use("/uploads/students", express.static(path.join(__dirname, "uploads/students")));
router.use("/uploads/sessions", express.static(path.join(__dirname, "uploads/sessions")));
router.use("/uploads/courses", express.static(path.join(__dirname, "uploads/courses")));


router.post("/student", studentImageUpload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.status(200).json({ filePath: `/uploads/students/images/${req.file.filename}` });
});

router.post("/session", sessionImageUpload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.status(200).json({ filePath: `/uploads/sessions/images/${req.file.filename}` });
});

router.post("/course", courseImageUpload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.status(200).json({ filePath: `/uploads/courses/images/${req.file.filename}` });
});

export default router;