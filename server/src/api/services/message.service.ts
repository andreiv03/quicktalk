import { Message } from "@/models/message.model";

interface Sender {
	_id: string;
	username: string;
}

export const MessageService = {
	async getMessagesForConversation(conversation: string, limit: number, skip: number) {
		return Message.find({ conversation }, "_id conversation createdAt sender text")
			.sort({ updatedAt: 1 })
			.skip(skip)
			.limit(limit)
			.populate<{ sender: Sender }>("sender", "_id username")
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
