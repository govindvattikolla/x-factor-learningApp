import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./config/dbconfig.js";
import courseRoutes from "./routes/CourseRoutes.js";
import AdminRoute from "./routes/AdminRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import RoleCheck from "./middleware/RoleCheck.js";
import StaticRoute from "./routes/StaticRoute.js";
import UserRoutes from "./routes/UserRoutes.js";
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
    console.log("📁 Folder created: uploads");
} else {
    console.log("📁 Folder already exists: uploads");
}
import {fileURLToPath} from "url";
import path from "path";
import DashboardRoute from "./routes/DashboardRoute.js";
import webhookRoute from "./routes/webhookRoute.js";

dotenv.config();
connectDB().then(() => {
    console.log("MongoDB Connected!")
});

const app = express();
const corsOptions = {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(RoleCheck);
app.use(webhookRoute);
app.use(DashboardRoute);
app.use(StaticRoute);
app.use(AuthRoute);
app.use(courseRoutes);
app.use(UserRoutes);
app.use(AdminRoute);
app.all("/api/", (req, res) => {
    res.status(404).json({error: "Route not found"});
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
