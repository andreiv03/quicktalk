import type { Request, Response } from "express";

interface RequestBody {
  creator: string;
  name: string;
  type: string;
};

const createChannel = async (req: Request, res: Response) => {
  try {
    const { creator, name, type }: RequestBody = req.body;
    if (!creator || !name || !type) return res.status(400).json({ message: "Something went wrong!" });

    const { default: ChannelsModel } = await import("../../models/channels-model");
    const newChannel = await ChannelsModel.create({ creator, name, type });

    return res.status(200).json(newChannel);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default createChannel;