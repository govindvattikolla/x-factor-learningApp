import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["credit_card", "debit_card", "upi", "paypal", "cashfree", "other"],
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
