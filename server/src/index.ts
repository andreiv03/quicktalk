import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

import { router } from "api/routes";
import { config } from "utils/config";
import { establishMongoDBConnection } from "utils/db";
import { establishSocketIOConnection } from "utils/socket";

const corsOptions = { credentials: true, origin: config.CLIENT_URL };
const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/api", router);
app.get("*", (_req, res) => res.send("Server is running"));

const server = app.listen(config.PORT, () => {
	console.log(`Server is running on port ${config.PORT}`);
});

const io = new Server(server, { cors: corsOptions });

establishMongoDBConnection();
establishSocketIOConnection(io);

process.on("SIGINT", () => {
	console.log("Shutting down...");
	server.close(() => {
		console.log("Server is offline");
		process.exit(0);
	});
});
