import { Request, Response, NextFunction } from "express";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { UserController } from "./UserController";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = UserController.generateJwt(req.user);

  const user = await User.findOne({ where: { id: req.user.id } });

  if (!user) {
    return next(ApiError.internal("Пользователь был удален из базы"));
  }

  res.json({ token });
};
