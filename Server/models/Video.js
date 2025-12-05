import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    thumbnail: String,
    videoSource: {
        type: String,
        required: true,
        enum: ['s3', 'youtube']
    },
    key: String,
    hlsPath: String,
    rawVideoKey: String,
    status: { type: String, enum: ["processing", "ready", "failed","queued"], default: "queued" },
    videoPublicId: String,
    courseId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        index: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    }
}, {
    timestamps: true
});

export default mongoose.model("Video", VideoSchema);
