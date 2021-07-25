import { Router } from "express";
import * as usersController from "../controllers/users.controller";

let router = Router();

router.post("/signup", usersController.signup);

export default router;
