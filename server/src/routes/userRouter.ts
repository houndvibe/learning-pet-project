import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.get("/checkAuth", authMiddleware, userController.checkAuth);
userRouter.get("/getUsers", authMiddleware, userController.getUsers);

export default userRouter;
