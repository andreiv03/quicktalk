"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_channels_1 = __importDefault(require("../controllers/channels/get-channels"));
const create_channel_1 = __importDefault(require("../controllers/channels/create-channel"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const router = (0, express_1.Router)();
router.post("/get", authorization_1.default, get_channels_1.default);
router.post("/create", authorization_1.default, create_channel_1.default);
exports.default = router;
