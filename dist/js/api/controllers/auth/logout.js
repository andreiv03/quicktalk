"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            path: "/"
        });
        return res.status(200).json({ message: "You have been logged out!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.default = logout;
