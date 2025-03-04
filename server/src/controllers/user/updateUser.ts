import { Request, Response, NextFunction } from "express";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, role, id, email, avatar }: User = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }

    if (username) {
      const candidate = await User.findOne({ where: { username } });
      if (candidate && candidate.id !== user.id) {
        return next(
          ApiError.badRequest("Пользователь с таким username уже существует")
        );
      }
    }

    await User.update({ username, role, email, avatar }, { where: { id } });

    const updatedUser = await User.findOne({ where: { id } });
    res.json({ data: updatedUser });
  } catch (error) {
    next(ApiError.internal("Ошибка при обновлении пользователя"));
  }
};
