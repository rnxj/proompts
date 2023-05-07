import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("=> using existing MongoDB connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "proompts"
        });
        isConnected = db.connections[0].readyState;
        console.log("=> using new MongoDB connection");
    } catch (error) {
        console.log("=> error connecting to MongoDB:", error.message);
    }
}