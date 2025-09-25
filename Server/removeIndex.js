const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      await mongoose.connection.db.collection("courses").dropIndexes(); // Drop all indexes
      console.log("✅ All indexes removed. Now creating a new unique index...");

      await mongoose.connection.db.collection("courses").createIndex({ title: 1 }, { unique: true });
      console.log("✅ Unique index on 'title' recreated successfully");
    } catch (error) {
      console.error("⚠️ Error resetting index:", error.message);
    }

    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
