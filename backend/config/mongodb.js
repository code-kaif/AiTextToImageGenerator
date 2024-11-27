import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  await mongoose.connect(
    "mongodb+srv://nodeapp:nodeapp@cluster0.c6s2l3o.mongodb.net/Imagify"
  );
};

export default connectDB;
