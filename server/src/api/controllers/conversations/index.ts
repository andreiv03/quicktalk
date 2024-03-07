import type { Request, Response } from "express";

import { Conversation } from "api/models/conversation";

const GET = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		const conversations = await Conversation.find({ "participants._id": userId })
			.sort({ updatedAt: 1 })
			.select("participants")
			.lean();

		const validConversations = conversations
			.map((conversation) => {
				const participant = conversation.participants.find(
					(participant) => participant._id !== userId
				);
				return participant ? { _id: conversation._id, name: participant.username } : null;
			})
			.filter((conversation) => conversation !== null);

		return res.status(200).json(validConversations);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const conversationsController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
