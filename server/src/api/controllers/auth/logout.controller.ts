import type { Request, Response } from "express";

const GET = async (_req: Request, res: Response) => {
	try {
		res.clearCookie("refreshToken", {
			httpOnly: true,
			path: "/",
			maxAge: -1,
			sameSite: "strict",
			secure: process.env["NODE_ENV"] !== "development"
		});

		return res.status(200).end();
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const logoutController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(404).json({ message: "API route not found!" });
	}
};
