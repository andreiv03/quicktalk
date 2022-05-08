"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!constants_1.MONGODB_URI)
        throw new Error("Database URI not found!");
    yield mongoose_1.default.connect(constants_1.MONGODB_URI).catch((error) => {
        if (error)
            throw error;
    });
    mongoose_1.default.connection.on("connected", () => console.log("Mongoose connection established!"));
    mongoose_1.default.connection.on("disconnected", () => console.warn("Mongoose connection lost!"));
    mongoose_1.default.connection.on("error", (error) => console.error(`Mongoose connection error:\n${error.stack}`));
});
exports.default = connectToMongoDB;
