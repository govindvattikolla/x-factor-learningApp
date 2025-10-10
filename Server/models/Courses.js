import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    price: Number,
    image: String

});

export default mongoose.model("Course", CourseSchema);
