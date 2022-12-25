import mongoose, { MongooseError } from "mongoose";
import { MONGODB_URI } from "../constants";

const connectToMongoDB = async () => {
  if (!MONGODB_URI) throw new Error("Database URI not found!");

  await mongoose.connect(MONGODB_URI).catch((error: MongooseError) => {
    if (error) throw error;
  });

  mongoose.connection.on("connected", () => console.log("Mongoose connection established!"));
  mongoose.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
  mongoose.connection.on("error", (error: MongooseError) => console.error(`Mongoose connection error:\n${error.stack}`));
}

export default connectToMongoDB;