import { Message } from "@/models/message.model";

export const MessageService = {
	async getMessagesForConversation(conversation: string, limit: number, skip: number) {
		return Message.find({ conversation }, "_id conversation createdAt sender text")
			.sort({ updatedAt: 1 })
			.skip(skip)
			.limit(limit)
			.lean();
	},

	async sendMessage(conversation: string, sender: string, text: string) {
		return Message.create({
			conversation,
			sender,
			text,
		});
	},
};
