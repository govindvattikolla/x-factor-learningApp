import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String,required: true},
    phone: {type: String, required: true},
    password : {type: String},
    address: {type: String},
    description: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
