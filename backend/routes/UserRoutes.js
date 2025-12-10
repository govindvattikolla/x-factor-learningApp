import express from "express";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import CourseProgress from "../models/CourseProgress.js";

const router = express.Router();

import { razorpayInstance } from "../service/razorpayInstance.js";
import crypto from "crypto";

router.post("/api/user/course/:id/create-order", async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.sessionData.id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        const options = {
            amount: course.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);

        await Purchase.create({
            courseID: courseId,
            userId: userId,
            status:"pending",
            recipientId:`receipt_${Date.now()}`,
            orderId:order.id,
        });

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.title
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Payment order creation failed" });
    }
});

router.post("/api/user/payment/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
        const userId = req.sessionData.id;

        const course = await Course.findById(courseId);

        if (!course) return res.status(404).json({ error: "Course not found" });

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ error: "Payment verification failed" });
        }

        await Purchase.updateOne(
            {
                orderId:razorpay_order_id,
            },
            {
                status:'success',
                paymentOn:Date.now()
            }
        );

        await CourseProgress.create({
            courseId,
            userId,
            isCompleted: false,
            totalVideos:course.totalVideos
        });

        res.json({ message: "Payment verified, course purchased" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Payment verification failed" });
    }
});


router.get("/api/user/me", async (req, res) => {
    try {
        if (!req.sessionData || !req.sessionData.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userId = req.sessionData.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
