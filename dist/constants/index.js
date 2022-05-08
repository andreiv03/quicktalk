"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URI = exports.CLIENT_URL = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config();
if (env.error)
    throw new Error("Couldn't find .env file!");
const PORT = process.env.PORT || "5000";
exports.PORT = PORT;
const NODE_ENV = process.env.NODE_ENV || "development";
exports.NODE_ENV = NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL;
exports.CLIENT_URL = CLIENT_URL;
const MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
