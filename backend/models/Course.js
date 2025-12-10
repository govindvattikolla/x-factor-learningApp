import mongoose from "mongoose";
import s3Service from "../service/S3Service.js";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    thumbnailId: String,
    price: {
        type: Number,
        required: true,
    },
    totalVideos:{
        type: Number,
        required: true,
        default: 1
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    }
}, {
    timestamps: true
});

CourseSchema.set("toObject", { virtuals: true });
CourseSchema.set("toJSON", {virtuals: true });



export default mongoose.model("Course", CourseSchema);
