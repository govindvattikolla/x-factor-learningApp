const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Student = require("../models/students"); // Assuming your model is named 'students'

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/students");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store the files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique file name
    },
});

const upload = multer({ storage: storage });

// Route to get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students); 
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
});

// Route to add a new student, including image upload
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imagePath = `/uploads/students/${req.file.filename}`;

        // Create a new student with the uploaded image path
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            description: req.body.description,
            image: imagePath, 
        });

        await student.save(); // Save the student in the database
        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Error adding student", error: error.message });
    }
});

// DELETE API endpoint to delete a student and their image
router.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        // Find the student in the database by ID
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // If the student has an image, delete the image file
        if (student.image) {
            const imagePath = path.join(__dirname, '..', 'uploads', 'students', student.image.replace('/uploads/students/', ''));

            // Log the image path to confirm it's correct before deletion
            console.log('Resolved Image Path to be Deleted:', imagePath);

            // Check if the file exists before trying to delete it
            if (fs.existsSync(imagePath)) {
                // If the image exists, delete it
                fs.unlinkSync(imagePath);
                console.log('Image deleted successfully:', imagePath);
            } else {
                // If the image file doesn't exist, log an error
                console.log('Image file not found at path:', imagePath);
                return res.status(500).json({ message: 'Image not found on the server' });
            }
        } else {
            console.log('No image associated with this student');
        }

        // Now delete the student record from the database
        await Student.findByIdAndDelete(studentId);
        return res.status(200).json({ message: 'Student and image deleted successfully' });

    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
});

module.exports = router;
