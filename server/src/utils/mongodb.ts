import mongoose from "mongoose";
import { constants } from "utils/constants";

export const establishMongoDBConnection = async () => {
  await mongoose.connect(constants.MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection established!");
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection lost!");
  });

  mongoose.connection.on("error", (error: mongoose.MongooseError) => {
    console.error(`Mongoose connection error:\n${error.stack}`);
  });
};
