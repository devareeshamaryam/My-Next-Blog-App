import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'next-blog-app'  // ⬅️ ADD THIS
        });
        console.log(" DB Connected to:", mongoose.connection.db.databaseName);
    } catch (error) {
        console.error(" DB Connection Error:", error.message);
        throw error;  
    }
}