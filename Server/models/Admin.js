import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        phone: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        image: {type: String},
    },
    {
        timestamps: true,
    }
);
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model("Admin", AdminSchema);

export default Student;