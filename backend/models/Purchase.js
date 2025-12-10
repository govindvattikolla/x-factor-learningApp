import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        recipientId: {
           type: String,
           required: true,
        },
        status:{
            type: String,
            required: true,
            enum: ["pending", "success", "failed", "processing","cancelled"],
        },
        courseID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["credit_card", "debit_card", "upi", "paypal", "cashfree","razorpay","other"],
        },
        paymentOn: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Purchase", PurchaseSchema);
