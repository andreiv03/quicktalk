import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || "5000";
const CLIENT_URL = process.env.CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, CLIENT_URL, MONGODB_URI, JWT_SECRET };
