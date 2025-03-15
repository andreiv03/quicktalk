import { Router } from "express";

import { MessageController } from "@/controllers/message.controller";
import { authorization } from "@/middleware/authorization";

const router = Router();

router.use(authorization);
router.get("/conversation/:conversationId", MessageController.getMessagesForConversation);
router.post("/send-message", MessageController.sendMessage);

export default router;
