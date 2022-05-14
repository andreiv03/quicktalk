"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../constants");
class JsonWebToken {
    signToken(subject, expiresIn) {
        return new Promise((resolve, reject) => {
            if (!constants_1.JWT_SECRET)
                throw new Error("Secret Token not found!");
            const data = {
                sub: subject,
                iat: Date.now()
            };
            jsonwebtoken_1.default.sign(data, constants_1.JWT_SECRET, { expiresIn }, (error, token) => {
                if (error)
                    reject(error);
                if (token)
                    resolve(token);
                reject("Token not found!");
            });
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            if (!constants_1.JWT_SECRET)
                throw new Error("Secret Token not found!");
            jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET, (error, payload) => {
                if (error)
                    reject(error);
                if (payload)
                    resolve(payload);
                reject("Payload not found!");
            });
        });
    }
}
;
const jsonWebToken = new JsonWebToken();
exports.default = jsonWebToken;
