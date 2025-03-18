import fs from "fs";
import path from "path";

export const createAvatarPath = (avatar: string): string => {
  const uploadsDir = path.join(__dirname, "../../../../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Извлекаем данные и тип изображения из base64
  const matches = avatar.toString().match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

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
