import connectDB from "../config/dbconfig.js";
import dotenv from "dotenv";
dotenv.config();

connectDB().then(() => {
    console.log("MongoDB Connected!")
});

console.log('cron jobs initialized');
import "./image-cleanup.js";