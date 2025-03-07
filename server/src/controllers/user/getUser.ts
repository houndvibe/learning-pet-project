import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { Request, Response, NextFunction } from "express";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.query;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ["password"] }, // исключаем поле password
  });

  if (!id || typeof id !== "string") {
    return next(ApiError.badRequest("ID пользователя обязателен"));
  }

  if (!user) {
    return next(ApiError.internal("Не одуалось найти такого юзера в базе"));
  }

  const data = {
    username: user.username,
    role: user.role,
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    age: user.age,
    bio: user.bio,
  };

  res.json({ data });
};
