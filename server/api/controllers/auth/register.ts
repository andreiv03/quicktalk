import type { Request, Response } from "express";
import bcrypt from "bcrypt";

interface RequestBody {
  email: string;
  password: string;
  username: string;
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username }: RequestBody = req.body;
    if (!email || !password || !username) return res.status(400).json({ message: "All fields are required!" });

    const { default: UsersModel } = await import("../../models/users-model");
    const user = await UsersModel.exists({ email });
    if (user) return res.status(400).json({ message: "Email address already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UsersModel.create({
      contacts: [],
      email,
      password: hashedPassword,
      username
    });

    const { default: jsonWebToken } = await import("../../utils/jsonwebtoken");
    const accessToken = await jsonWebToken.signToken(newUser._id, "10m");
    const refreshToken = await jsonWebToken.signToken(newUser._id, "7d");

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

export default register;