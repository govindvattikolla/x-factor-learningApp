import fs from "fs";
import path from "path";

export const ensureFolderExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log("📁 Folder created:", folderPath);
    } else {
        console.log("📁 Folder already exists:", folderPath);
    }
};