import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL as string);
    if (conn) {
      console.log("MongoDB is connected successfully", conn.connection.host);
    }
  } catch (error: any) {
    console.log(`Something went Wrong ${error.message}`);
    // to stop the code from running after the error
    process.exit(1);
  }
};
