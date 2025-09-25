const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {  type: String, 
        required: true, 
        
        trim: true  },
    description: String,
    price: Number,
    image: String
   
});

module.exports = mongoose.model("Course", CourseSchema);
