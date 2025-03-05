import { Request, Response, NextFunction } from "express";
import { registration } from "../auth/registration";
import { refresh } from "../auth/refresh";
import { login } from "../auth/login";
import { checkAuth } from "../auth/checkAuth";
import jwt from "jsonwebtoken";
import { User } from "database/database";

export class AuthController {
  public static generateJwt = ({ id, username, role }: User): string => {
    return jwt.sign({ id, username, role }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  public static generateRefreshJwt = ({ id, username, role }: User): string => {
    return jwt.sign({ id, username, role }, process.env.REFRESH_SECRET_KEY, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });
  };

  async registration(req: Request, res: Response, next: NextFunction) {
    return registration(req, res, next);
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    return refresh(req, res, next);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    return login(req, res, next);
  }

  async checkAuth(req: Request, res: Response, next: NextFunction) {
    return checkAuth(req, res, next);
  }
}

export default new AuthController();
