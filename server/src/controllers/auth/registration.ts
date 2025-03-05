import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { AuthController } from "./AuthController";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, role }: User = req.body;

  if (!username || !password) {
    return next(ApiError.badRequest("Некорректный username или пароль"));
  }

  const candidate = await User.findOne({ where: { username } });
  if (candidate) {
    return next(
      ApiError.badRequest("Пользователь с таким username уже существует")
    );
  }

  const hashedPassword: string = await bcrypt.hash(password, 5);
  const user = await User.create({
    username,
    role,
    password: hashedPassword,
  });

  const token: string = AuthController.generateJwt(user);
  const refreshToken: string = AuthController.generateRefreshJwt(user);

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
