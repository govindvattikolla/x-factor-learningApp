import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Student from "../models/Students.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads/students");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({message: "Error fetching students", error: error.message});
    }
});

router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        }

        const imagePath = `/uploads/students/${req.file.filename}`;

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            description: req.body.description,
            image: imagePath,
        });

        await student.save();
        res.status(201).json({message: "Student added successfully", student});
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({message: "Error adding student", error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        if (student.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'students', student.image.replace('/uploads/students/', ''));
            console.log('Resolved Image Path to be Deleted:', imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Image deleted successfully:', imagePath);
            } else {
                console.log('Image file not found at path:', imagePath);
                return res.status(500).json({message: 'Image not found on the server'});
            }
        } else {
            console.log('No image associated with this student');
        }

        await Student.findByIdAndDelete(studentId);
        return res.status(200).json({message: 'Student and image deleted successfully'});

    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({message: 'Error deleting student', error: error.message});
    }
});

export default router;
