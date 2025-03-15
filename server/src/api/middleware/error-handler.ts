import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	const message = error.message || "Internal Server Error";
	const statusCode = typeof error.status === "number" ? error.status : 500;
	res.status(statusCode).json({ message, statusCode });
};
