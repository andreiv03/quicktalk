import type { Request, Response } from "express";
import bcrypt from "bcrypt";

interface RequestBody {
  email: string;
  password: string;
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: RequestBody = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required!" });

    const { default: UsersModel } = await import("../../models/users-model");
    const user = await UsersModel.findOne({ email }).select("password").lean();
    if (!user) return res.status(400).json({ message: "User not found!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password!" });

    const { default: jsonWebToken } = await import("../../utils/jsonwebtoken");
    const accessToken = await jsonWebToken.signToken(user._id, "10m");
    const refreshToken = await jsonWebToken.signToken(user._id, "7d");

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default login;