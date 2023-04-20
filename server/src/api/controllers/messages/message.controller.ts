import type { Request, Response } from "express";
import { MessagesModel } from "api/models/messages.model";

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
      return res.status(404).json({ message: "Something went wrong!" });

    const message = await MessagesModel.create({
      conversation,
      createdAt: Date.now(),
      sender,
      text
    });

    return res.status(200).json({ _id: message._id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const messageController = (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
