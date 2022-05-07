import dotenv, { DotenvConfigOutput } from "dotenv";

const env: DotenvConfigOutput = dotenv.config();
if (env.error) throw new Error("Couldn't find .env file!");

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, CLIENT_URL, MONGODB_URI, JWT_SECRET };