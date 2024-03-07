import mongoose from "mongoose";

import { config } from "utils/config";

mongoose.connection.on("connected", () => {
	console.log("Mongoose connection established");
});

mongoose.connection.on("disconnected", () => {
	console.warn("Mongoose connection lost");
});

mongoose.connection.on("error", (error: mongoose.MongooseError) => {
	console.error(`Mongoose connection error:\n${error.stack}`);
});

export const establishMongoDBConnection = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
	} catch (error: any) {
		console.error(`Mongoose connection error:\n${error.stack}`);
		process.exit(1);
	}
};
