import { Router } from "express";

import { ConversationController } from "@/controllers/conversation.controller";
import { authorization } from "@/middleware/authorization";

const router = Router();

router.use(authorization);
router.get("/", ConversationController.getUserConversations);
router.get("/:receiverId", ConversationController.getOrCreateConversation);

export default router;
