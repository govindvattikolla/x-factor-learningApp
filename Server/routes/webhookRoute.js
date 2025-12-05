import crypto from "crypto";
import express from "express";
import CourseProgress from "../models/CourseProgress.js";
import Purchase from "../models/Purchase.js";

const webhookRoute = express.Router();

// webhookRoute.post("/api/user/payment/verify", async (req, res) => {
//     try {
//         console.log(req.body);
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
//         const userId = req.sessionData.id;
//
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//             .digest("hex");
//
//         if (expectedSignature !== razorpay_signature) {
//             return res.status(400).json({ error: "Payment verification failed" });
//         }
//
//         await Purchase.updateOne(
//             {
//                 orderId:razorpay_order_id,
//             },
//             {
//                 status:'success',
//                 paymentOn:Date.now()
//             }
//         );
//
//         await CourseProgress.create({
//             courseId,
//             userId,
//             isCompleted: false
//         });
//
//         res.json({ message: "Payment verified, course purchased" });
//
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Payment verification failed" });
//     }
// });

export default webhookRoute;