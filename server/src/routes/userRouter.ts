import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *       - User
 *     summary: registration - Регистрация нового пользователя
 *     description: Создает нового пользователя с уникальным username и паролем, хэширует пароль, генерирует токены и отправляет их в ответ.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Уникальное имя пользователя.
 *               password:
 *                 type: string
 *                 description: Пароль пользователя.
 *               role:
 *                 type: string
 *                 description: Роль пользователя.
 *     responses:
 *       200:
 *         description: Токен авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Токен для доступа к защищенным маршрутам.
 *       400:
 *         description: Некорректный запрос (например, если username или password пустые).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки.
 */
userRouter.post("/registration", userController.registration);
/**
 * @swagger
 * /refresh:
 *   post:
 *     tags:
 *       - User
 *     summary: refresh - Обновление токена авторизации
 *     description: Использует refresh-токен, чтобы получить новый токен для доступа к защищенным маршрутам.
 *     responses:
 *       200:
 *         description: Новый токен авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Новый токен для доступа к защищенным маршрутам.
 *       403:
 *         description: Отсутствует или недействителен refresh-токен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки (например, "Отсутствует refresh-токен" или "No refresh token").
 */
userRouter.post("/login", userController.login);
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: login - Авторизация пользователя
 *     description: Проверяет учетные данные пользователя (имя и пароль), генерирует токены и возвращает их в ответ.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя.
 *               password:
 *                 type: string
 *                 description: Пароль пользователя.
 *     responses:
 *       200:
 *         description: Токен авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Токен для доступа к защищенным маршрутам.
 *       400:
 *         description: Некорректный запрос (например, если username или password пустые).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки.
 *       403:
 *         description: Неверный логин или пароль.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки (например, "Пользователь с таким именем не найден" или "Неверный пароль").
 */
userRouter.post("/refresh", userController.refresh);
/**
 * @swagger
 * /checkAuth:
 *   get:
 *     tags:
 *       - User
 *     summary: checkAuth - Проверка авторизации пользователя
 *     description: Проверяет, существует ли пользователь в базе данных, и генерирует новый токен авторизации для пользователя.
 *     responses:
 *       200:
 *         description: Новый токен авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Новый токен для доступа к защищенным маршрутам.
 *       404:
 *         description: Пользователь не найден или был удален из базы данных.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки ("Юзер был удален из базы").
 */
userRouter.get("/checkAuth", authMiddleware, userController.checkAuth);
/**
 * @swagger
 * /getUsers:
 *   get:
 *     tags:
 *       - User
 *     summary: getUsers - Получение списка всех пользователей
 *     description: Возвращает список всех пользователей в базе данных, включая их username, роль и ID.
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Идентификатор пользователя.
 *                       username:
 *                         type: string
 *                         description: Имя пользователя.
 *                       role:
 *                         type: string
 *                         description: Роль пользователя.
 *       500:
 *         description: Ошибка получения списка пользователей.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки ("Список юзеров пуст").
 */

userRouter.get("/getUsers", authMiddleware, userController.getUsers);

export default userRouter;
