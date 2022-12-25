import { Router } from "express";

import getMessages from "../controllers/messages/get-messages";
import postMessage from "../controllers/messages/post-message";
import authorization from "../middleware/authorization";

const router: Router = Router();

router.get("/get/:channel", authorization, getMessages);
router.post("/post", authorization, postMessage);

export default router;