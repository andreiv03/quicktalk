import asyncHandler from "express-async-handler";
import { ConversationService } from "@/services/conversation.service";

export const ConversationController = {
	getUserConversations: asyncHandler(async (req, res) => {
		const userId = req.userId;
		if (!userId) {
			throw { message: "Unauthorized", status: 401 };
		}

		const conversations = await ConversationService.getUserConversations(userId);
		res.status(200).json({ message: "Conversations fetched successfully", conversations });
	}),

	getOrCreateConversation: asyncHandler(async (req, res) => {
		const { receiverId } = req.params;
		if (!receiverId) {
			throw { message: "Conversation does not exist", status: 400 };
		}

		const userId = req.userId;
		if (!userId) {
			throw { message: "Unauthorized", status: 401 };
		}

		const conversation = await ConversationService.getOrCreateConversation(
			userId,
			receiverId.toString(),
		);

		res.status(200).json({ message: "Conversation fetched successfully", conversation });
	}),
};
