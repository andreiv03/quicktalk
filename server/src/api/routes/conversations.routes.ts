import { Router } from "express";

import { conversationController } from "api/controllers/conversations/conversation.controller";
import { conversationsController } from "api/controllers/conversations/index";
import { authorization } from "api/middleware/authorization";

const router = Router();

router.get("/conversation", authorization, conversationController);
router.get("/", authorization, conversationsController);

export { router as conversationsRouter };
