import type { Request, Response } from "express";

const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      path: "/"
    });

    return res.status(200).json({ message: "You have been logged out!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default logout;