"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes"));
const users_routes_1 = __importDefault(require("./users-routes"));
const channels_routes_1 = __importDefault(require("./channels-routes"));
const messages_routes_1 = __importDefault(require("./messages-routes"));
const router = (0, express_1.Router)();
router.use("/api/auth", auth_routes_1.default);
router.use("/api/users", users_routes_1.default);
router.use("/api/channels", channels_routes_1.default);
router.use("/api/messages", messages_routes_1.default);
exports.default = router;
