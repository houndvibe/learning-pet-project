import { Request, Response, NextFunction } from "express";
import { User } from "../../database/database";
import ApiError from "../../error/ApiError";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, role, id, email, avatar, age, bio }: User = req.body;

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }

    const sameEmailUser = await User.findOne({
      where: {
        email,
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (sameEmailUser) {
      return next(
        ApiError.badRequest("Пользователь c такой почтой уже существует")
      );
    }

    if (username) {
      const candidate = await User.findOne({
        where: { username },
      });
      if (candidate && candidate.id !== user.id) {
        return next(
          ApiError.badRequest("Пользователь с таким username уже существует")
        );
      }
    }

    const createAvatarPath = (avatar) => {
      const uploadsDir = path.join(__dirname, "../../../uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Извлекаем данные и тип изображения из base64
      const matches = avatar
        .toString()
        .match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

      if (matches && matches.length === 3) {
        const type = matches[1];
        const data = Buffer.from(matches[2], "base64");
        const extension = type.split("/")[1];
        const filename = `${Date.now()}.${extension}`;
        const filePath = path.join(uploadsDir, filename);

        // Сохраняем файл
        fs.writeFileSync(filePath, data);

        // Обновляем путь к аватару для сохранения в БД
        return `/uploads/${filename}`;
      }
      return "";
    };

    const IsBase64 = avatar && avatar.toString().startsWith("data:image");

    const avatarPath = IsBase64 ? createAvatarPath(avatar) : user.avatar;

    await User.update(
      { username, role, email, avatar: avatarPath, age, bio },
      { where: { id } }
    );

    const updatedUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });

    res.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    next(ApiError.internal("Ошибка при обновлении пользователя"));
  }
};
