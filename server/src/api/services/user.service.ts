import { Types } from "mongoose";
import { User } from "@/models/user.model";

export const UserService = {
	async getUserById(userId: string) {
		const user = User.findById(userId, "_id email username").lean();
		if (!user) {
			throw { message: "User not found", status: 404 };
		}

		return user;
	},

	async searchUsersByUsername(userId: string, username: string) {
		return User.aggregate([
			{
				$match: {
					username: new RegExp(`^${username}.*`, "i"),
					_id: { $ne: new Types.ObjectId(userId) },
				},
			},
			{
				$project: {
					username: 1,
					score: {
						$subtract: [10, { $divide: [{ $strLenCP: "$username" }, username.length] }],
					},
				},
			},
			{ $sort: { score: -1 } },
			{ $limit: 10 },
		]);
	},
};
