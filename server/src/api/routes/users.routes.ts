import { Router } from "express";

import { UserController } from "@/controllers/user.controller";
import { authorization } from "@/middleware/authorization";

const router = Router();

router.use(authorization);
router.get("/user", UserController.getUserById);
router.get("/search/:username", UserController.searchUsersByUsername);

export default router;
