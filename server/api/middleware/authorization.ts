import type { Request, Response, NextFunction } from "express";

const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationToken = req.header("authorization");
    if (!authorizationToken) return res.status(400).json({ message: "Unauthorized!" });
  
    const { default: jsonWebToken } = await import("../utils/jsonwebtoken");
    const decoded = await jsonWebToken.verifyToken(authorizationToken);

    const { default: UsersModel } = await import("../models/users-model");
    const user = await UsersModel.findById(decoded.sub).select("_id").lean();
    if (!user) return res.status(400).json({ message: "User not found!" });
    
    req.userId = user._id;
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default authorization;