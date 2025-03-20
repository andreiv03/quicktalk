import asyncHandler from "express-async-handler";
import { AuthService } from "@/services/auth.service";
import { COOKIE_OPTIONS } from "@/config/constants";

export const AuthController = {
	login: asyncHandler(async (req, res) => {
		const { username, password } = req.body;
		if (!username || !password) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const { accessToken, refreshToken } = await AuthService.login(username, password);
		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
		res.status(200).json({ message: "Logged in successfully", accessToken });
	}),

	register: asyncHandler(async (req, res) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const { accessToken, refreshToken } = await AuthService.register(username, email, password);
		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
		res.status(201).json({ message: "Registered successfully", accessToken });
	}),

	logout: asyncHandler(async (_req, res) => {
		res.clearCookie("refreshToken", { ...COOKIE_OPTIONS, maxAge: undefined });
		res.status(200).json({ message: "Logged out successfully" });
	}),

	refreshToken: asyncHandler(async (req, res) => {
		const refreshToken = req.cookies["refreshToken"];
		if (!refreshToken) {
			throw { message: "Refresh token is missing", status: 400 };
		}

		const accessToken = await AuthService.refreshToken(refreshToken);
		res.status(200).json({ message: "Token refreshed successfully", accessToken });
	}),
};
