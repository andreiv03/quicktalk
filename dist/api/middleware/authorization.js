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
Object.defineProperty(exports, "__esModule", { value: true });
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationToken = req.header("authorization");
        if (!authorizationToken)
            return res.status(400).json({ message: "Unauthorized!" });
        const { default: jsonWebToken } = yield Promise.resolve().then(() => __importStar(require("../utils/jsonwebtoken")));
        const decoded = yield jsonWebToken.verifyToken(authorizationToken);
        const { default: UsersModel } = yield Promise.resolve().then(() => __importStar(require("../models/users-model")));
        const user = yield UsersModel.findById(decoded.sub).select("_id").lean();
        if (!user)
            return res.status(400).json({ message: "User not found!" });
        req.userId = user._id;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.default = authorization;
