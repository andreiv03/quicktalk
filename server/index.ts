import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import { PORT, CLIENT_URL } from "./constants";
import routes from "./api/routes";
import socket from "./connections/socket";
import connectToMongoDB from "./connections/mongoose";

const app = express();
const options = { credentials: true, origin: CLIENT_URL };

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());
app.use(routes);

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: options });

httpServer.listen(PORT, () => {
  socket(io);
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
}).on("error", () => process.exit(1));