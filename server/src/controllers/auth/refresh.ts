import ApiError from "../../error/ApiError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthController } from "./AuthController";

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(ApiError.forbidden("Отсутствует refresh-токен"));
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY as string,
    (err: any, user: any) => {
      if (err)
        return next(ApiError.forbidden("Недействительный refresh-токен"));
      const token = AuthController.generateJwt(user);
      res.json({ token });
    }
  );
};
