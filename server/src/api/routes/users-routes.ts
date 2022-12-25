import { Router } from "express";

import getCurrentUser from "../controllers/users/get-current-user";
import getAllUsers from "../controllers/users/get-all-users";
import authorization from "../middleware/authorization";

const router: Router = Router();

router.get("/current", authorization, getCurrentUser);
router.get("/all", authorization, getAllUsers);

export default router;