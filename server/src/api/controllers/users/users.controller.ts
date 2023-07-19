import type { Request, Response } from "express";
import { UsersModel } from "api/models/users.model";

const GET = async (req: Request, res: Response) => {
	try {
		const { username } = req.params;
		if (!username) return res.status(404).json({ message: "Something went wrong!" });

		const usernameRegex = new RegExp(`.*${username}.*`, "i");
		const users = await UsersModel.aggregate([
			{
				$match: {
					username: usernameRegex
				}
			},
			{
				$match: {
					_id: { $ne: req.userId }
				}
			},
			{
				$project: {
					username: 1,
					score: {
						$cond: [
							{ $eq: [{ $substrCP: ["$username", 0, username.length] }, username] },
							{ $subtract: [10, { $divide: [{ $strLenCP: "$username" }, username.length] }] },
							{ $subtract: [1, { $divide: [{ $strLenCP: "$username" }, username.length] }] }
						]
					}
				}
			},
			{
				$sort: {
					score: -1
				}
			},
			{
				$limit: 10
			}
		]);

		return res.status(200).json(users);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const usersController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(404).json({ message: "API route not found!" });
	}
};
