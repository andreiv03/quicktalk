import type { Request, Response } from "express";

const getChannels = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (!type) return res.status(400).json({ message: "Something went wrong!" });

    const { default: ChannelsModel } = await import("../../models/channels-model");
    const channels = await ChannelsModel.find({ type }).sort({ updatedAt: 1 }).select("creator name type").lean();
    
    return res.status(200).json(channels);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getChannels;