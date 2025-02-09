import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Эндпоинты для работы с пользователями
 */
router.use("/user", userRouter);
export default router;
