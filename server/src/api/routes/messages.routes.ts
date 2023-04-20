import { Router } from "express";

import { messageController } from "api/controllers/messages/message.controller";
import { messagesController } from "api/controllers/messages/messages.controller";
import { authorization } from "api/middleware/authorization";

const router = Router();
router.post("/message", authorization, messageController);
router.get("/conversation/:conversation", authorization, messagesController);

export { router as messagesRouter };
