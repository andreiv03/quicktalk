import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

import { ENV } from "@/config/constants";

export const signToken = (
	subject: string | object,
	expiresIn: number | StringValue,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const payload: string | Buffer | object = { sub: subject };
		const options: jwt.SignOptions = { algorithm: "HS256", expiresIn };

		jwt.sign(payload, ENV.JWT_SECRET, options, (error, token) => {
			if (error || !token) {
				return reject(error || "Token generation failed");
			}

			resolve(token);
		});
	});
};

export const verifyToken = (token: string): Promise<string | jwt.JwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, ENV.JWT_SECRET, (error, decoded) => {
			if (error || !decoded) {
				return reject(error || "Token verification failed");
			}

			resolve(decoded);
		});
	});
};
