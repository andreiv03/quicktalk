import argon2 from "argon2";

import { User } from "@/models/user.model";
import { signToken, verifyToken } from "@/utils/jwt";

export const AuthService = {
	async login(username: string, password: string) {
		const user = await User.findOne({ username }, "password").lean();
		if (!user) {
			throw { message: "Invalid credentials", status: 401 };
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			throw { message: "Invalid credentials", status: 401 };
		}

		return {
			accessToken: await signToken(user._id, "10m"),
			refreshToken: await signToken(user._id, "7d"),
		};
	},

	async register(username: string, email: string, password: string) {
		const existingUser = await User.findOne({ email }, "_id").lean();
		if (existingUser) {
			throw { message: "Email already taken", status: 409 };
		}

		const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
		const user = await User.create({ username, email, password: hashedPassword });

		return {
			accessToken: await signToken(user._id as string, "10m"),
			refreshToken: await signToken(user._id as string, "7d"),
		};
	},

	async refreshToken(refreshToken: string) {
		const decodedToken = await verifyToken(refreshToken);
		if (!decodedToken || !decodedToken.sub) {
			throw { message: "Invalid token", status: 401 };
		}

		return signToken(decodedToken.sub, "10m");
	},
};
