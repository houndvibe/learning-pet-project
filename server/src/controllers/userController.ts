import { User } from "../database/database";
import bcrypt from "bcrypt";
import ApiError from "../error/ApiError";
import jwt from "jsonwebtoken";

const generateJwt = (id, username, role): string => {
  return jwt.sign({ id, username, role }, process.env.SECRET_KEY, {
    expiresIn: "10h",
  });
};

const generateRefreshJwt = (id, username, role): string => {
  return jwt.sign({ id, username, role }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
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
    const refreshToken: string = generateRefreshJwt(
      user.id,
      user.username,
      user.role
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.json({ token });
  }

  async refresh(req, res, next): Promise<string> {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return next(ApiError.forbidden("Отсутствует refresh-токен"));

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) return next(ApiError.forbidden("No refresh token"));
      const token = generateJwt(user.id, user.username, user.role);
      res.json({ token });
    });
  }

  async login(req, res, next): Promise<string> {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user)
      return next(ApiError.internal("Пользователь с таким именем не найден"));

    const comparePassword: boolean = bcrypt.compareSync(
      password,
      user.password
    );

    if (!comparePassword)
      return next(ApiError.internal("Указа не верный пароль"));

    const token: string = generateJwt(user.id, user.username, user.role);
    const refreshToken: string = generateRefreshJwt(
      user.id,
      user.username,
      user.role
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.json({ token });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.username, req.user.role);

    const user = await User.findOne({ where: { username: req.user.username } });

    if (!user) return next(ApiError.internal("Юзер был удален из базы"));
    return res.json({ token });
  }

  async getUsers(req, res, next) {
    const users = await User.findAll();

    if (!users) return next(ApiError.internal("Список юзеров пуст"));

    const formatedUsers = await users.map(({ username, role, id }) => {
      return {
        username,
        role,
        id,
      };
    });

    return res.json({ formatedUsers });
  }
}

export default new UserController();
