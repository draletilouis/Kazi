import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authMiddleware } from "./auth.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/change-password", authMiddleware, authController.changePassword);

export default router;