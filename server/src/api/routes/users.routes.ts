import { Router } from "express";

import { userController } from "api/controllers/users/user.controller";
import { usersController } from "api/controllers/users/users.controller";
import { authorization } from "api/middleware/authorization";

const router = Router();
router.get("/user", authorization, userController);
router.get("/username/:username", authorization, usersController);

export { router as usersRouter };
