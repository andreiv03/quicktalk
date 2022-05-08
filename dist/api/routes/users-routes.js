"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_current_user_1 = __importDefault(require("../controllers/users/get-current-user"));
const get_all_users_1 = __importDefault(require("../controllers/users/get-all-users"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const router = (0, express_1.Router)();
router.get("/current", authorization_1.default, get_current_user_1.default);
router.get("/all", authorization_1.default, get_all_users_1.default);
exports.default = router;
