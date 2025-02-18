import { Request, Response, NextFunction } from "express";
import { registration } from "./registration";
import { refresh } from "./refresh";
import { login } from "./login";
import { checkAuth } from "./checkAuth";
import { getUsers } from "./getUsers";
import { deleteUser } from "./deleteUser";
import jwt from "jsonwebtoken";
import { User } from "database/database";
import { updateUser } from "./updateUser";

export class UserController {
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

  async getUsers(req: Request, res: Response, next: NextFunction) {
    return getUsers(req, res, next);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    return deleteUser(req, res, next);
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    return updateUser(req, res, next);
  }
}

export default new UserController();
