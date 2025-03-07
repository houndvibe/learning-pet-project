import { Request, Response, NextFunction } from "express";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { Op } from "sequelize";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, role, id, email, avatar, age, bio }: User = req.body;

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }

    const sameEmailUser = await User.findOne({
      where: {
        email,
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (sameEmailUser) {
      return next(
        ApiError.badRequest("Пользователь c такой почтой уже существует")
      );
    }

    if (username) {
      const candidate = await User.findOne({
        where: { username },
      });
      if (candidate && candidate.id !== user.id) {
        return next(
          ApiError.badRequest("Пользователь с таким username уже существует")
        );
      }
    }

    await User.update(
      { username, role, email, avatar, age, bio },
      { where: { id } }
    );

    const updatedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    res.json({ data: updatedUser });
  } catch (error) {
    next(ApiError.internal("Ошибка при обновлении пользователя"));
  }
};
