import type { Request, Response } from "express";

interface RequestBody {
  channel: string;
  sender: string;
  text: string;
};

const postMessage = async (req: Request, res: Response) => {
  try {
    const { channel, sender, text }: RequestBody = req.body;
    if (!channel || !sender || !text) return res.status(400).json({ message: "Something went wrong!" });

    const { default: MessagesModel } = await import("../../models/messages-model");
    const newMessage = await MessagesModel.create({ channel, sender, text });

    return res.status(200).json({ _id: newMessage._id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default postMessage;