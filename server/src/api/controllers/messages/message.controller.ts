import type { Request, Response } from "express";

import { Message } from "api/models/message";

interface ExtendedPostRequest extends Request {
	body: {
		conversation: string;
		sender: string;
		text: string;
	};
}

const POST = async (req: ExtendedPostRequest, res: Response) => {
	try {
		const { conversation, sender, text } = req.body;
		if (!conversation || !sender || !text)
			return res.status(404).json({ message: "Missing required fields" });

		const message = await Message.create({
			conversation,
			createdAt: Date.now(),
			sender,
			text
		});

		return res.status(201).json({ _id: message._id });
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};

export const messageController = (req: Request, res: Response) => {
	switch (req.method) {
		case "POST":
			return POST(req, res);
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};
