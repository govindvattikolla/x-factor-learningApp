import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbconfig.js";
import studentRoutes from "./routes/studentRoutes.js";
import sessionRoutes from "./routes/SessionRoutes.js";
import courseRoutes from "./routes/CourseRoutes.js";
import AdminRoute from "./routes/AdminRoute.js";
import UploadRoute from "./routes/UploadRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ensureDirectoryExistence from "./service/folderMaintaince.js";
import AdminAuth from "./middleware/AdminAuth.js";

dotenv.config();
connectDB().then(() => {
    console.log("MongoDB Connected!")
});

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
app.use(express.urlencoded({extended: true}));

["./uploads/students/images", "./uploads/sessions/images", "./uploads/courses/images"].forEach(ensureDirectoryExistence);

app.use("/api",AuthRoute);
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/admin/course",AdminAuth,courseRoutes);
app.use("/api/upload", UploadRoute);
app.use("/api/admin", AdminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
