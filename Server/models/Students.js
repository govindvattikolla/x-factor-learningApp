import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String,required: true,unique:true},
    phone: {type: String, required: true,unique:true},
    password : {type: String,required: true},
    address: {type: String},
    description: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
});

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
