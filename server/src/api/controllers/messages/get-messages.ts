import type { Request, Response } from "express";

const getMessages = async (req: Request, res: Response) => {
  try {
    const { channel } = req.params;
    if (!channel) return res.status(400).json({ message: "Something went wrong!" });

    const { default: MessagesModel } = await import("../../models/messages-model");
    const messages = await MessagesModel.find({ channel }).sort({ updatedAt: 1 }).select("channel createdAt sender text").lean();

    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getMessages;