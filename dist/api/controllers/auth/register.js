"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt_1 = __importDefault(require("bcrypt"));
;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username)
            return res.status(400).json({ message: "All fields are required!" });
        const { default: UsersModel } = yield Promise.resolve().then(() => __importStar(require("../../models/users-model")));
        const user = yield UsersModel.exists({ email });
        if (user)
            return res.status(400).json({ message: "Email address already registered!" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield UsersModel.create({
            contacts: [],
            email,
            password: hashedPassword,
            username
        });
        const { default: jsonWebToken } = yield Promise.resolve().then(() => __importStar(require("../../utils/jsonwebtoken")));
        const accessToken = yield jsonWebToken.signToken(newUser._id, "10m");
        const refreshToken = yield jsonWebToken.signToken(newUser._id, "7d");
        res.cookie("refreshToken", refreshToken, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.default = register;
