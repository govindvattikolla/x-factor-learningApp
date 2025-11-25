import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    watchedPercentage: {
        type: Number,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    lastWatchedAt: {
        type: Number, // seconds
        default: 0
    }
}, { timestamps: true });

UserProgressSchema.pre("save", function(next){
    if (this.watchedPercentage >= 90) {
        this.isCompleted = true;
    }
    next();
});

export default mongoose.model("UserProgress", UserProgressSchema);