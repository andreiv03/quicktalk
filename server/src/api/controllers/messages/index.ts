import type { Request, Response } from "express";

import { Message } from "api/models/message";

const GET = async (req: Request, res: Response) => {
	try {
		const { conversation } = req.params;
		if (!conversation) return res.status(404).json({ message: "Missing required parameters" });

		const messages = await Message.find({ conversation })
			.sort({ updatedAt: 1 })
			.select("conversation createdAt sender text")
			.lean();

		return res.status(200).json(messages);
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const messagesController = (req: Request, res: Response) => {
	switch (req.method) {
		case "GET":
			return GET(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
