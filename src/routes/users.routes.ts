import { Router } from "express";
import * as usersController from "../controllers/users.controller";

let router = Router();

router.post("/signup", usersController.signup);
router.post("/signin", usersController.signin);
router.patch(
  "/change-password",
  usersController.protectedRoutes,
  usersController.updatePassword
);

export default router;
