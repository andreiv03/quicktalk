import { Router } from "express";

import { loginController } from "api/controllers/auth/login.controller";
import { logoutController } from "api/controllers/auth/logout.controller";
import { refreshTokenController } from "api/controllers/auth/refresh-token.controller";
import { registerController } from "api/controllers/auth/register.controller";

const router = Router();
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/refresh-token", refreshTokenController);
router.post("/register", registerController);

export { router as authRouter };
