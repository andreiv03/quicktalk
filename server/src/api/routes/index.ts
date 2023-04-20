import { Router } from "express";

import { authRouter } from "api/routes/auth.routes";
import { conversationsRouter } from "api/routes/conversations.routes";
import { messagesRouter } from "api/routes/messages.routes";
import { usersRouter } from "api/routes/users.routes";

export const router = Router();
router.use("/api/auth", authRouter);
router.use("/api/conversations", conversationsRouter);
router.use("/api/messages", messagesRouter);
router.use("/api/users", usersRouter);
