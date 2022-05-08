import { Router } from "express";

import getChannels from "../controllers/channels/get-channels";
import createChannel from "../controllers/channels/create-channel";
import deleteChannel from "../controllers/channels/delete-channel";
import authorization from "../middleware/authorization";

const router: Router = Router();

router.get("/get/:type", authorization, getChannels);
router.post("/create", authorization, createChannel);
router.delete("/delete/:channel", authorization, deleteChannel);

export default router;