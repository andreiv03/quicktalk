import { Router } from "express";

import { authRouter } from "api/routes/auth.routes";
import { conversationsRouter } from "api/routes/conversations.routes";
import { messagesRouter } from "api/routes/messages.routes";
import { usersRouter } from "api/routes/users.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/conversations", conversationsRouter);
router.use("/messages", messagesRouter);
router.use("/users", usersRouter);
