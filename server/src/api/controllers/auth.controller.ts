import asyncHandler from "express-async-handler";
import { AuthService } from "@/services/auth.service";

export const AuthController = {
	login: asyncHandler(async (req, res) => {
		const { username, password, userAgent, ip } = req.body;
		if (!username || !password || !userAgent || !ip) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const { accessToken, refreshToken, sessionId } = await AuthService.login(
			username,
			password,
			userAgent,
			ip,
		);

		const data = { accessToken, refreshToken, sessionId };
		res.status(200).json({ message: "Logged in successfully", ...data });
	}),

	register: asyncHandler(async (req, res) => {
		const { username, email, password, userAgent, ip } = req.body;
		if (!username || !email || !password || !userAgent || !ip) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const { accessToken, refreshToken, sessionId } = await AuthService.register(
			username,
			email,
			password,
			userAgent,
			ip,
		);

		const data = { accessToken, refreshToken, sessionId };
		res.status(201).json({ message: "Registered successfully", ...data });
	}),

	logout: asyncHandler(async (req, res) => {
		const { userId, sessionId } = req.body;
		if (!userId || !sessionId) {
			throw { message: "You are not logged in", status: 400 };
		}

		await AuthService.logout(userId, sessionId);
		res.status(200).json({ message: "Logged out successfully" });
	}),

	logoutAll: asyncHandler(async (req, res) => {
		const { userId } = req.body;
		if (!userId) {
			throw { message: "You are not logged in", status: 400 };
		}

		await AuthService.logoutAll(userId);
		res.status(200).json({ message: "Logged out from all devices successfully" });
	}),

	refreshToken: asyncHandler(async (req, res) => {
		const { refreshToken, sessionId } = req.body;
		if (!refreshToken || !sessionId) {
			throw { message: "You are not logged in", status: 400 };
		}

		const accessToken = await AuthService.refreshToken(refreshToken, sessionId);
		res.status(200).json({ message: "Token refreshed successfully", accessToken });
	}),
};
