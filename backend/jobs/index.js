import connectDB from "../config/dbconfig.js";
import dotenv from "dotenv";
dotenv.config();

const args = process.argv.slice(2);

let mode = null;
const modeIndex = args.indexOf("--mode");
if (modeIndex !== -1) {
    mode = args[modeIndex + 1];
}

console.log("Mode:", mode);

connectDB().then(() => {
    console.log("MongoDB Connected!");
});

console.log("cron jobs initialized");

import "./image-cleanup.js";

if (mode === "transcode") {
    import("./transcodeWorker.js");
}
