import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const [,, name, email, phone, password] = process.argv;

if (!name || !email || !phone || !password) {
    console.log("❌ Usage: node seedAdmin.js <name> <email> <phone> <password>");
    process.exit(1);
}

const seedAdmin = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL);

        console.log("🔍 Checking if admin already exists...");

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            console.log("⚠️ Admin with this email already exists!");
            process.exit(0);
        }
        await Admin.create({
            name,
            email,
            phone,
            password,
            image: ""
        });

        console.log("✅ Admin created successfully!");
        process.exit(0);

    } catch (err) {
        console.error("❌ Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin().then(r => console.log("done"));
