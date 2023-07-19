import type { Request, Response } from "express";
import { ConversationsModel } from "api/models/conversations.model";

const GET = async (req: Request, res: Response) => {
	try {
		const receiverId = req.query["receiverId"];
		const receiverUsername = req.query["receiverUsername"];
		const senderUsername = req.query["senderUsername"];
		if (!receiverId || !receiverUsername || !senderUsername)
			return res.status(404).json({ message: "Something went wrong!" });

		let conversation = await ConversationsModel.findOne({
			"participants._id": { $all: [receiverId, req.userId.toString()] }
		})
			.select("participants")
			.lean();

		if (conversation?._id)
			return res.status(200).json({
				_id: conversation._id,
				name: receiverUsername
			});

		conversation = await ConversationsModel.create({
			participants: [
				{ _id: receiverId, username: receiverUsername },
				{ _id: req.userId.toString(), username: senderUsername }
			].sort((a, b) => (a.username as string).localeCompare(b.username as string))
		});

		return res.status(200).json({
			_id: conversation._id,
			name: receiverUsername
		});
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const conversationController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(404).json({ message: "API route not found!" });
	}
};
