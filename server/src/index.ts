import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { router } from "api/routes";
import { establishMongoDBConnection } from "utils/mongodb";
import { establishSocketIOConnection } from "utils/socketio";

const DEVELOPMENT_URL = "http://localhost:3000";
const PRODUCTION_URL = "";
const CLIENT_URL = process.env["NODE_ENV"] === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;
const PORT = process.env["NODE_ENV"] === "production" ? process.env["PORT"] : "5000";

const corsOptions = { credentials: true, origin: CLIENT_URL };
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(router);
app.get("*", (_req, res) => res.send("Server is running!"));

const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

establishMongoDBConnection();
establishSocketIOConnection(io);

server
	.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	.on("error", () => process.exit(1));
