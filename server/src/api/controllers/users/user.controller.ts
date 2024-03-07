import type { Request, Response } from "express";

import { User } from "api/models/user";

const GET = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const user = await User.findById(userId).select("email username").lean();
		if (!user) return res.status(404).json({ message: "User not found" });

		return res.status(200).json(user);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const userController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
