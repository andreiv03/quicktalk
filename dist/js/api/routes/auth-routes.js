"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = __importDefault(require("../controllers/auth/register"));
const login_1 = __importDefault(require("../controllers/auth/login"));
const logout_1 = __importDefault(require("../controllers/auth/logout"));
const refresh_token_1 = __importDefault(require("../controllers/auth/refresh-token"));
const router = (0, express_1.Router)();
router.post("/register", register_1.default);
router.post("/login", login_1.default);
router.get("/logout", logout_1.default);
router.get("/refresh-token", refresh_token_1.default);
exports.default = router;
