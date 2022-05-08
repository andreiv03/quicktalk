import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  const env = dotenv.config();
  if (env.error) throw new Error("Couldn't find .env file!");
}

const PORT = process.env.PORT || "5000";
const NODE_ENV = process.env.NODE_ENV || "development";
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, NODE_ENV, CLIENT_URL, MONGODB_URI, JWT_SECRET };