// import mongoose from "mongoose"

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI)
//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.error(`Error: ${error.message}`)
//     process.exit(1)
//   }
// }

// export default connectDB

import dotenv from "dotenv";
dotenv.config(); // Must be before using process.env

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
