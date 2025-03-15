import asyncHandler from "express-async-handler";

import { User } from "@/models/user.model";
import { verifyToken } from "@/utils/jwt";

const extractBearerToken = (authorization: string): string | null => {
	return authorization.startsWith("Bearer ") ? (authorization.split(" ")[1] ?? null) : null;
};

export const authorization = asyncHandler(async (req, _res, next) => {
	const { authorization: authHeader } = req.headers;
	if (!authHeader) {
		throw { message: "Authorization header is missing", status: 401 };
	}

	const token = extractBearerToken(authHeader);
	if (!token) {
		throw { message: "Bearer token is missing", status: 401 };
	}

	const decodedToken = await verifyToken(token);
	if (!decodedToken || !decodedToken.sub) {
		throw { message: "Invalid token", status: 401 };
	}

	const user = await User.findById(decodedToken.sub).select("_id").lean();
	if (!user) {
		throw { message: "User not found", status: 404 };
	}

	req.userId = user._id.toString();
	next();
});
