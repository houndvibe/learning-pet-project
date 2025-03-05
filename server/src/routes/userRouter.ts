import userController from "../controllers/user/UserController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.refresh);
userRouter.get("/checkAuth", authMiddleware, userController.checkAuth);
userRouter.get("/getUsers", authMiddleware, userController.getUsers);
userRouter.delete("/deleteUser", authMiddleware, userController.deleteUser);
userRouter.put("/updateUser", authMiddleware, userController.updateUser);

export default userRouter;
