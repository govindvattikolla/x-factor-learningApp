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
import DashboardRoute from "./routes/DashboardRoute.js";
import webhookRoute from "./routes/webhookRoute.js";

dotenv.config();
connectDB().then(() => {
    console.log("MongoDB Connected!")
});

const app = express();
const origins=process.env.ALLOWED_ORIGINS;
if(!origins){
    console.log("please add the allowed ORIGINS");
    process.exit(1);
}
const corsOptions = {
    origin: origins.split(","),
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
app.use(webhookRoute);
app.use(DashboardRoute);
app.use(StaticRoute);
app.use(AuthRoute);
app.use(courseRoutes);
app.use(UserRoutes);
app.use(AdminRoute);
app.all("*", (req, res) => {
    res.status(404).json({error: "Route not found"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
