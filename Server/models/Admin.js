import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String},
    phone: {type: String, required: true},
    address: {type: String},
    description: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
});

const Student = mongoose.model("Admin", AdminSchema);

export default Student;