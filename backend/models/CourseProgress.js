import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedVideos: {
        type: Number,
        default: 0
    },
    totalVideos: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model("CourseProgress", CourseProgressSchema);