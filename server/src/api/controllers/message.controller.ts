import asyncHandler from "express-async-handler";
import { MessageService } from "@/services/message.service";

export const MessageController = {
	getMessagesForConversation: asyncHandler(async (req, res) => {
		const { conversationId, limit = "50", skip = "0" } = req.params;
		if (!conversationId) {
			throw { message: "Conversation ID is missing", status: 400 };
		}

		const parsedLimit = parseInt(limit, 10);
		if (isNaN(parsedLimit) || parsedLimit <= 0) {
			throw { message: "Invalid limit value", status: 400 };
		}

		const parsedSkip = parseInt(skip, 10);
		if (isNaN(parsedSkip) || parsedSkip < 0) {
			throw { message: "Invalid skip value", status: 400 };
		}

		const messages = await MessageService.getMessagesForConversation(
			conversationId,
			parsedLimit,
			parsedSkip,
		);

		res.status(200).json({ message: "Messages fetched successfully", messages });
	}),

	sendMessage: asyncHandler(async (req, res) => {
		const { conversation, sender, text } = req.body;
		if (!conversation || !sender || !text) {
			throw { message: "Missing required fields", status: 400 };
		}

		const message = await MessageService.sendMessage(conversation, sender, text);
		res.status(201).json({ message: "Message sent successfully", newMessage: message });
	}),
};
