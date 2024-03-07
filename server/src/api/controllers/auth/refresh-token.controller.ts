import type { Request, Response } from "express";

import { signToken, verifyToken } from "utils/jwt";

const GET = async (req: Request, res: Response) => {
	try {
		const refreshTokenCookie = req.cookies["refreshToken"];
		if (!refreshTokenCookie) return res.status(401).json({ message: "Authentication required" });

		const payload = await verifyToken(refreshTokenCookie);
		if (!payload) return res.status(401).json({ message: "Authentication required" });

		const accessToken = await signToken(payload.sub, "10m");
		return res.status(200).json({ accessToken });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const refreshTokenController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
