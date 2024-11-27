import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  await mongoose.connect(`mongodb://127.0.0.1:27017/Imagify`);
};

export default connectDB;
