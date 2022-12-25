import type { Request, Response } from "express";

const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) return res.status(400).json({ message: "Authentication required!" });

    const { default: jsonWebToken } = await import("../../utils/jsonwebtoken");
    const decoded = await jsonWebToken.verifyToken(refreshTokenCookie);
    if (!decoded) return res.status(400).json({ message: "Authentication required!" });

    const accessToken = await jsonWebToken.signToken(decoded.sub, "10m");
    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default refreshToken;