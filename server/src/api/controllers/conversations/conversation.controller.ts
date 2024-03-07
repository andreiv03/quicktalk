import type { Request, Response } from "express";

import { Conversation } from "api/models/conversation";

const GET = async (req: Request, res: Response) => {
	try {
		const receiverId = req.query["receiverId"];
		const receiverUsername = req.query["receiverUsername"];
		const senderUsername = req.query["senderUsername"];
		if (!receiverId || !receiverUsername || !senderUsername)
			return res.status(404).json({ message: "Missing required query parameters" });

		const userId = req.userId;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });

		let conversation = await Conversation.findOne({
			"participants._id": { $all: [receiverId, userId] }
		})
			.select("participants")
			.lean();

		if (conversation && conversation._id)
			return res.status(200).json({
				_id: conversation._id,
				name: receiverUsername
			});

		const participants = [
			{ _id: receiverId, username: receiverUsername },
			{ _id: userId, username: senderUsername }
		].sort((a, b) => (a.username as string).localeCompare(b.username as string));

		conversation = await Conversation.create({ participants });

		return res.status(201).json({
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
			return res.status(405).json({ message: "Method not allowed" });
	}
};
