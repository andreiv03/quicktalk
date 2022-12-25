import type { Request, Response } from "express";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { default: UsersModel } = await import("../../models/users-model");
    const user = await UsersModel.findById(req.userId).select("email username").lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getCurrentUser;