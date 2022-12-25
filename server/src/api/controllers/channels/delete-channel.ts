import type { Request, Response } from "express";

const deleteChannel = async (req: Request, res: Response) => {
  try {
    const { channel } = req.params;
    if (!channel) return res.status(400).json({ message: "Something went wrong!" });

    const { default: MessagesModel } = await import("../../models/messages-model");
    await MessagesModel.deleteMany({ channel });

    const { default: ChannelsModel } = await import("../../models/channels-model");
    await ChannelsModel.deleteOne({ _id: channel });

    return res.status(200).end();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default deleteChannel;