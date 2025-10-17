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
import RoleCheck from "./middleware/RoleCheck.js";
import "./jobs/index.js";
import StaticRoute from "./routes/StaticRoute.js";

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

app.use(RoleCheck);
app.use(StaticRoute);
app.use(AuthRoute);
app.use(courseRoutes);
app.use(studentRoutes);
app.use(sessionRoutes);
app.use(UploadRoute);
app.use(AdminRoute);
app.all("/api/", (req, res) => {
    res.status(404).json({error: "Route not found"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
