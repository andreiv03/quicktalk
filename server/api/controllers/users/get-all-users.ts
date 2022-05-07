import type { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { default: UsersModel } = await import("../../models/users-model");
    const users = await UsersModel.find({ _id: { $ne: req.userId } }).select("email username").lean();
    
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default getAllUsers;