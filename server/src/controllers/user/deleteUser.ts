import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { Request, Response, NextFunction } from "express";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }

    await user.destroy();

    return res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    return next(ApiError.internal("Пользователь не найден"));
  }
};
