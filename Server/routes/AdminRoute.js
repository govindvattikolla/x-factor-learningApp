import express from "express";
import Student from "../models/Admin.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;
        const student = await Student.create({
            name,email,phone,password,
        });
        student.password = '';
        res.json({success: true,message:"Admin created successfully", student});
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: "internal server error",
            error: e.message,
        })
    }
});

export default router;