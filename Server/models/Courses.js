import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    thumbnail: String,
    key: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }, price: {
        type: Number,
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    }
}, {
    timestamps: true
});

export default mongoose.model("Course", CourseSchema);
