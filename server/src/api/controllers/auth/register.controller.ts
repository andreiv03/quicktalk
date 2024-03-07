import { hash } from "bcrypt";
import type { Request, Response } from "express";

import { User } from "api/models/user";
import { signToken } from "utils/jwt";

interface ExtendedPostRequest extends Request {
	body: {
		email: string;
		password: string;
		username: string;
	};
}

const POST = async (req: ExtendedPostRequest, res: Response) => {
	try {
		const { email, password, username } = req.body;
		if (!email || !password || !username)
			return res.status(404).json({ message: "Missing required fields" });

		const isEmailRegistered = await User.exists({ email });
		if (isEmailRegistered)
			return res.status(400).json({ message: "Email address already registered" });

		const hashedPassword = await hash(password, 10);
		const user = await User.create({
			email,
			password: hashedPassword,
			username
		});

		const accessToken = await signToken(user._id, "10m");
		const refreshToken = await signToken(user._id, "7d");

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			path: "/",
			maxAge: 7 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env["NODE_ENV"] !== "development"
		});

		return res.status(201).json({ accessToken });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const registerController = (req: Request, res: Response) => {
	switch (req.method) {
		case "POST":
			return POST(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
