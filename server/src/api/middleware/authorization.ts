import type { NextFunction, Request, Response } from "express";

import { User } from "api/models/user";
import { verifyToken } from "utils/jwt";

const extractBearerToken = (authorization: string | undefined) => {
	if (!authorization) return null;
	const parts = authorization.split(" ");
	if (parts.length !== 2 || parts[0] !== "Bearer") return null;
	return parts[1];
};

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationToken = extractBearerToken(req.headers.authorization);
		if (!authorizationToken) return res.status(401).json({ message: "Unauthorized" });

		const payload = await verifyToken(authorizationToken);
		const user = await User.findById(payload.sub).select("_id").lean();
		if (!user) return res.status(404).json({ message: "User not found" });

		req.userId = user._id;
		return next();
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};
