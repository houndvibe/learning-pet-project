import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ApiError.unauthorised("Пользователь не авторизован"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(ApiError.unauthorised("Срок действия токена истёк"));
    } else if (error.name === "JsonWebTokenError") {
      return next(ApiError.unauthorised("Неверный токен"));
    } else {
      return next(ApiError.unauthorised("Ошибка аутентификации"));
    }
  }
};
