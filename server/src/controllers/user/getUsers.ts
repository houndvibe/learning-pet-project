import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { Request, Response, NextFunction } from "express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const users = await User.findAll();

  if (!users) {
    return next(ApiError.internal("Список пользователей пуст"));
  }

  const data = users.map(({ username, role, id, email, avatar }) => ({
    username,
    role,
    id,
    email,
    avatar,
  }));

  res.json({ data });
};
