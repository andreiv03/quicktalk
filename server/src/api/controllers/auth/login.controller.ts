import { compare } from "bcrypt";
import type { Request, Response } from "express";

import { UsersModel } from "api/models/users.model";
import { signToken } from "utils/jwt";

interface ExtendedPostRequest extends Request {
  body: {
    password: string;
    username: string;
  };
}

const POST = async (req: ExtendedPostRequest, res: Response) => {
  try {
    const { password, username } = req.body;
    if (!password || !username)
      return res.status(406).json({ message: "All fields are required!" });

    const user = await UsersModel.findOne({ username }).select("password").lean();
    if (!user) return res.status(404).json({ message: "User not found!" });

    const match = await compare(password, user.password);
    if (!match) return res.status(403).json({ message: "Incorrect password!" });

    const accessToken = await signToken(user._id, "10m");
    const refreshToken = await signToken(user._id, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env["NODE_ENV"] !== "development"
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginController = (req: Request, res: Response) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};
