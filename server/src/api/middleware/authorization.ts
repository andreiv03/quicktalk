import type { NextFunction, Request, Response } from "express";

import { UsersModel } from "api/models/users.model";
import { verifyToken } from "utils/jwt";

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationToken = req.header("Authorization");
    if (!authorizationToken || !authorizationToken.split(" ")[1])
      return res.status(401).json({ message: "Unauthorized!" });

    const payload = await verifyToken(authorizationToken.split(" ")[1] as string);
    const user = await UsersModel.findById(payload.sub).select("_id").lean();
    if (!user) return res.status(404).json({ message: "User not found!" });

    req.userId = user._id;
    return next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
