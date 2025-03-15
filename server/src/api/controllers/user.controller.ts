import asyncHandler from "express-async-handler";
import { UserService } from "@/services/user.service";

export const UserController = {
	getUserById: asyncHandler(async (req, res) => {
		const userId = req.userId;
		if (!userId) {
			throw { message: "Unauthorized", status: 401 };
		}

		const user = await UserService.getUserById(userId);
		res.status(200).json({ message: "User profile fetched successfully", user });
	}),

	searchUsersByUsername: asyncHandler(async (req, res) => {
		const userId = req.userId;
		if (!userId) {
			throw { message: "Unauthorized", status: 401 };
		}

		const { username } = req.params;
		if (!username) {
			throw { message: "Username is missing", status: 404 };
		}

		const users = await UserService.searchUsersByUsername(userId, username);
		res.status(200).json({ message: "Users fetched successfully", users });
	}),
};
