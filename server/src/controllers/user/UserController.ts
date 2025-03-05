import { Request, Response, NextFunction } from "express";
import { getUsers } from "./getUsers";
import { deleteUser } from "./deleteUser";
import { updateUser } from "./updateUser";

export class UserController {
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
