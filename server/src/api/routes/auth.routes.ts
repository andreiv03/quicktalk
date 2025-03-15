import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.get("/refresh-token", AuthController.refreshToken);

export default router;
