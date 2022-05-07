import { Router } from "express";

import getChannels from "../controllers/channels/get-channels";
import createChannel from "../controllers/channels/create-channel";
import authorization from "../middleware/authorization";

const router: Router = Router();

router.post("/get", authorization, getChannels);
router.post("/create", authorization, createChannel);

export default router;