import jwt from "jsonwebtoken";
import { constants } from "utils/constants";

export const signToken = (subject: any, expiresIn: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const data = {
			sub: subject,
			iat: Date.now()
		};

		jwt.sign(data, constants.JWT_SECRET, { expiresIn }, (error, token) => {
			if (error || !token) return reject(error || "Token not found!");
			return resolve(token);
		});
	});
};

export const verifyToken = (token: string): Promise<string | jwt.JwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, constants.JWT_SECRET, (error, payload) => {
			if (error || !payload) return reject(error || "Payload not found!");
			return resolve(payload);
		});
	});
};
