"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_messages_1 = __importDefault(require("../controllers/messages/get-messages"));
const post_message_1 = __importDefault(require("../controllers/messages/post-message"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const router = (0, express_1.Router)();
router.post("/get", authorization_1.default, get_messages_1.default);
router.post("/post", authorization_1.default, post_message_1.default);
exports.default = router;
