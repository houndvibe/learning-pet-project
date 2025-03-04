import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { UserController } from "./UserController";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password }: User = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return next(ApiError.internal("Пользователь с таким именем не найден"));
  }

  const comparePassword: boolean = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    return next(ApiError.internal("Указан неверный пароль"));
  }

  const token: string = UserController.generateJwt(user);
  const refreshToken: string = UserController.generateRefreshJwt(user);

  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    },
  });
};
