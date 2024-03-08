import type { Request, Response } from "express";
import { Types } from "mongoose";

import { User } from "api/models/user";

const GET = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const { username } = req.params;
		if (!username) return res.status(404).json({ message: "Missing required parameters" });

		const users = await User.aggregate([
			{
				$match: {
					username: new RegExp(`.*${username}.*`, "i")
				}
			},
			{
				$match: {
					_id: { $ne: new Types.ObjectId(userId) }
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
			return res.status(405).json({ message: "Method not allowed" });
	}
};
