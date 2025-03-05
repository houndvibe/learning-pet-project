import authController from "../controllers/auth/AuthController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const authRouter = Router();
authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.get("/checkAuth", authMiddleware, authController.checkAuth);

export default authRouter;
