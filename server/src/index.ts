import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";

import { router } from "api/routes";
import { establishMongoDBConnection } from "utils/mongodb";

const DEVELOPMENT_URL = "http://localhost:3000";
const PRODUCTION_URL = "";
const CLIENT_URL = process.env["NODE_ENV"] === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;
const PORT = process.env["NODE_ENV"] === "production" ? process.env["PORT"] : "5000";

const options = { credentials: true, origin: CLIENT_URL };
const app = express();
app.use(cookieParser());
app.use(cors(options));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(router);
app.get("*", (_req, res) => res.send("Server is running!"));

const server = createServer(app);
server
  .listen(PORT, () => {
    establishMongoDBConnection();
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", () => process.exit(1));
