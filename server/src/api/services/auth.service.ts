import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

import { redis } from "@/config/redis";
import { User } from "@/models/user.model";
import { signToken, verifyToken } from "@/utils/jwt";

interface Session {
	ip: string;
	refreshToken: string;
	userAgent: string;
}

export const AuthService = {
	async login(username: string, password: string, userAgent: string, ip: string) {
		const user = await User.findOne({ username }, "password").lean();
		if (!user) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const userId = user._id.toString();
		const accessToken = await signToken(userId, "10m");
		const refreshToken = await signToken(userId, "7d");
		const sessionId = uuidv4();

		const session = JSON.stringify({ ip, refreshToken, userAgent });
		await redis.set(`session:${userId}:${sessionId}`, session, {
			ex: 60 * 60 * 24 * 7, // 7 days
		});

		return { accessToken, refreshToken, sessionId };
	},

	async register(username: string, email: string, password: string, userAgent: string, ip: string) {
		const existingUser = await User.findOne({ email }, "_id").lean();
		if (existingUser) {
			throw { message: "Email already taken", status: 409 };
		}

		const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
		const user = await User.create({ username, email, password: hashedPassword });

		const userId = (user._id as object).toString();
		const accessToken = await signToken(userId, "10m");
		const refreshToken = await signToken(userId, "7d");
		const sessionId = uuidv4();

		const session = JSON.stringify({ ip, refreshToken, userAgent });
		await redis.set(`session:${userId}:${sessionId}`, session, {
			ex: 60 * 60 * 24 * 7, // 7 days
		});

		return { accessToken, refreshToken, sessionId };
	},

	async logout(userId: string, sessionId: string) {
		await redis.del(`session:${userId}:${sessionId}`);
	},

	async logoutAll(userId: string) {
		const keys = await redis.keys(`session:${userId}:*`);
		if (keys.length > 0) {
			await redis.del(...keys);
		}
	},

	async refreshToken(refreshToken: string, sessionId: string) {
		const decoded = await verifyToken(refreshToken);
		if (!decoded?.sub) {
			throw { message: "Invalid token", status: 401 };
		}

		const userId = decoded.sub;
		const session: Session | null = await redis.get(`session:${userId}:${sessionId}`);
		if (!session || session.refreshToken !== refreshToken) {
			throw { message: "Token expired or invalid", status: 401 };
		}

		return signToken(decoded.sub, "10m");
	},
};
