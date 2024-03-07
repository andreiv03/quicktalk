import jwt from "jsonwebtoken";

import { config } from "utils/config";

export const signToken = (subject: any, expiresIn: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const payload = { sub: subject };
		const options = { expiresIn };

		jwt.sign(payload, config.JWT_SECRET, options, (error, token) => {
			if (error) return reject(error);
			if (!token) return reject("Token generation failed");
			resolve(token);
		});
	});
};

export const verifyToken = (token: string): Promise<jwt.JwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
			if (error) return reject(error);
			if (!decoded) return reject("Token verification failed");
			resolve(decoded as jwt.JwtPayload);
		});
	});
};
