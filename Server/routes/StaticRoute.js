import express from 'express';
import path from "path";
import {fileURLToPath} from "url";
import {decrypt} from "../service/EncryptionService.js";
import fs from "fs";

const StaticRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

StaticRouter.get("/static/:id", (req, res) => {
    try {
        const absolutePath = path.join(__dirname, '..', 'uploads', decrypt(req.params.id));
        if (fs.existsSync(absolutePath)) {
            res.sendFile(absolutePath);
        } else {
            const absolutePath = path.join(__dirname, '..', 'public', "404.png");
            res.sendFile(absolutePath);
        }
    } catch (e) {
        const absolutePath = path.join(__dirname, '..', 'public', 'internalservererror.png');
        res.sendFile(absolutePath);
    }
});

export default StaticRouter;