import mongoose from "mongoose";
import { ENV } from "@/config/constants";

mongoose.connection.on("connected", () => {
	console.info("Mongoose connection established");
});

mongoose.connection.on("disconnected", () => {
	console.warn("Mongoose connection lost");
});

mongoose.connection.on("error", (error: mongoose.MongooseError) => {
	console.error(`Mongoose connection error:\n${error.stack}`);
});

export const establishMongoDBConnection = async () => {
	try {
		await mongoose.connect(ENV.MONGODB_URI);
	} catch (error: unknown) {
		console.error(`Mongoose connection error:\n${error instanceof Error ? error.stack : error}`);
		process.exit(1);
	}
};
