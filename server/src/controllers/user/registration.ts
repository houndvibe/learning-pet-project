import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../../database/database";
import { UserController } from "./UserController";
import ApiError from "../../error/ApiError";

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, role } = req.body;

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

  const token: string = UserController.generateJwt(
    user.id,
    user.username,
    user.role
  );
  const refreshToken: string = UserController.generateRefreshJwt(
    user.id,
    user.username,
    user.role
  );
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  res.json({ token });
};
