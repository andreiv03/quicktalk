import { Types } from "mongoose";

import { Conversation } from "@/models/conversation.model";
import { User } from "@/models/user.model";

interface Participant {
	_id: Types.ObjectId;
	username: string;
}

export const ConversationService = {
	async getUserConversations(userId: string) {
		const userObjectId = new Types.ObjectId(userId);

		const conversations = await Conversation.find(
			{ participants: userObjectId },
			"_id isArchived participants type",
		)
			.sort({ updatedAt: -1 })
			.populate<{ participants: Participant[] }>("participants", "_id username")
			.lean();

		return conversations.map((conversation) => ({
			...conversation,
			_id: conversation._id.toString(),
			participants: conversation.participants.map((participant) => ({
				_id: participant._id.toString(),
				username: participant.username,
			})),
		}));
	},

	async getOrCreateConversation(senderId: string, receiverId: string) {
		const senderObjectId = new Types.ObjectId(senderId);
		const receiverObjectId = new Types.ObjectId(receiverId);

		const conversation = await Conversation.findOne(
			{
				participants: { $all: [senderObjectId, receiverObjectId] },
			},
			"_id isArchived participants type",
		)
			.populate<{ participants: Participant[] }>("participants", "_id username")
			.lean();

		if (conversation) {
			return {
				...conversation,
				_id: conversation._id.toString(),
				participants: conversation.participants.map((participant) => ({
					_id: participant._id.toString(),
					username: participant.username,
				})),
			};
		}

		const [sender, receiver] = await Promise.all([
			User.findById(senderObjectId).select("_id username").lean(),
			User.findById(receiverObjectId).select("_id username").lean(),
		]);

		if (!sender || !receiver) {
			throw { message: "One or both participants not found", status: 404 };
		}

		const newConversation = await Conversation.create({
			isArchived: false,
			participants: [sender, receiver],
			type: "private",
		});

		return {
			_id: (newConversation._id as string).toString(),
			isArchived: false,
			participants: [sender, receiver].map((participant) => ({
				_id: participant._id.toString(),
				username: participant.username,
			})),
			type: "private",
		};
	},
};
