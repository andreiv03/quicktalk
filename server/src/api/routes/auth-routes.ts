import { Router } from "express";

import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import logout from "../controllers/auth/logout";
import refreshToken from "../controllers/auth/refresh-token";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);

export default router;