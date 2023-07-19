import type { Request, Response } from "express";
import { ConversationsModel } from "api/models/conversations.model";

const GET = async (req: Request, res: Response) => {
	try {
		const conversations = await ConversationsModel.find({
			"participants._id": req.userId.toString()
		})
			.sort({ updatedAt: 1 })
			.select("participants")
			.lean();

		return res.status(200).json(
			conversations.map((conversation) => ({
				_id: conversation._id,
				name: conversation.participants.find(
					(participant) => participant._id !== req.userId.toString()
				)?.username
			}))
		);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const conversationsController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(404).json({ message: "API route not found!" });
	}
};
