import { User } from "../database/database.js";
import bcrypt from "bcrypt";
import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

const generateJwt = (id, username, role): string => {
  return jwt.sign({ id, username, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next): Promise<string> {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return next(ApiError.badRequest("некоректный username или пароль"));
    }

    const condidate = await User.findOne({ where: { username } });
    if (condidate) {
      return next(
        ApiError.badRequest("Пользователь с таким username уже существует ")
      );
    }

    const hashedPassword: string = await bcrypt.hash(password, 5);
    const user = await User.create({
      username,
      role,
      password: hashedPassword,
    });
    const token: string = generateJwt(user.id, user.username, user.role);

    return res.json({ token });
  }

  async login(req, res, next): Promise<string> {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return next(ApiError.internal("Пользователь с таким именем не найден"));
    }

    const comparePassword: boolean = bcrypt.compareSync(
      password,
      user.password
    );

    if (!comparePassword) {
      return next(ApiError.internal("Указа не верный пароль"));
    }

    const token: string = generateJwt(user.id, user.username, user.role);
    return res.json({ token, role: user.role });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.username, req.user.role);

    const user = await User.findOne({ where: { username: req.user.username } });

    if (!user) {
      return next(ApiError.internal("Юзер был удален из базы"));
    }

    return res.json({ token });
  }
}

export default new UserController();
