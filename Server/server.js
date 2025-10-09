const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const connectDB = require("./config/dbconfig.js");
const studentRoutes = require("./routes/studentRoutes.js");
const sessionRoutes = require("./routes/SessionRoutes.js");
const courseRoutes = require("./routes/CourseRoutes.js");
const Course = require("./models/Courses.js");
const Student = require("./models/students.js");
const Session = require("./models/Session.js");

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  credentials: true,
};


app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};


["./uploads/students/images", "./uploads/sessions/images", "./uploads/courses/images"].forEach(ensureDirectoryExistence);

const configureMulter = (uploadPath) => multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});


const studentImageUpload = configureMulter("./uploads/students/images");
const sessionImageUpload = configureMulter("./uploads/sessions/images");
const courseImageUpload = configureMulter("./uploads/courses/images");


app.use("/uploads/students", express.static(path.join(__dirname, "uploads/students")));
app.use("/uploads/sessions", express.static(path.join(__dirname, "uploads/sessions")));
app.use("/uploads/courses", express.static(path.join(__dirname, "uploads/courses")));


app.post("/api/upload/student", studentImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/students/images/${req.file.filename}` });
});

app.post("/api/upload/session", sessionImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/sessions/images/${req.file.filename}` });
});

app.post("/api/upload/course", courseImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/courses/images/${req.file.filename}` });
});


app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/courses", courseRoutes);


app.get("/api/sessions", async (req, res) => {
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
    res.status(500).json({ error: "Error fetching sessions" });
  }
});


app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

// PUT Student Update Route
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("❌ Error updating student:", error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// for sessions based on course
app.get("/api/courses/:id/sessions", async (req, res) => {
  try {
    console.log("Fetching sessions for Course ID:", req.params.id);
    
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const sessions = await Session.find({ courseId: req.params.id });

    res.json({ course, sessions });
  } catch (error) {
    console.error("Error fetching course sessions:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//delete route for deleting session at specifsession
app.delete("/api/sessions/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting session:", error);
    res.status(500).json({ error: "Error deleting session" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
