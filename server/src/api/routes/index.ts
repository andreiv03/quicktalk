import { Router } from "express";

import authRoutes from "./auth-routes";
import usersRoutes from "./users-routes";
import channelsRoutes from "./channels-routes";
import messagesRoutes from "./messages-routes";

const router: Router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/channels", channelsRoutes);
router.use("/api/messages", messagesRoutes);

export default router;