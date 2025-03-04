import userController from "../controllers/user/UserController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();

/**
 * @swagger
 * /user/registration:
 *   post:
 *     tags:
 *       - User
 *     summary: registration - Регистрация нового пользователя
 *     description: Создает нового пользователя с уникальным username и паролем, хэширует пароль, генерирует токены и отправляет их в ответ.
 *     operationId: registration
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
 *                 enum:
 *                   - USER
 *                   - ADMIN
 *                 description: Роль пользователя.
 *             required:
 *               - username
 *               - password
 *               - role
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
 *               required:
 *                 - token
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
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: login - Аутентификация пользователя
 *     description: Аутентифицирует пользователя по логину и паролю, возвращает JWT-токен и устанавливает refresh-токен в куки.
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Успешная аутентификация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT-токен для доступа к защищенным маршрутам.
 *               required:
 *                 - token
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: refresh-токен, установленный в куки.
 *       400:
 *         description: Неверные данные для входа
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки (например, "Пользователь с таким именем не найден" или "Указан неверный пароль").
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки (например, "Ошибка сервера").
 */
userRouter.post("/login", userController.login);
/**
 * @swagger
 * user/refresh:
 *   post:
 *     tags:
 *       - User
 *     summary: refresh - Авторизация пользователя
 *     description: Проверяет учетные данные пользователя (имя и пароль), генерирует токены и возвращает их в ответ.
 *     operationId: refresh
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
 *             required:
 *               - username
 *               - password
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
 *               required:
 *                 - token
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
 * user/checkAuth:
 *   get:
 *     tags:
 *       - User
 *     summary: checkAuth - Проверка авторизации пользователя
 *     description: Проверяет, существует ли пользователь в базе данных, и генерирует новый токен авторизации для пользователя.
 *     operationId: checkAuth
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
 *               required:
 *                 - token
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
 * user/getUsers:
 *   get:
 *     tags:
 *       - User
 *     summary: getUsers - Получение списка всех пользователей
 *     description: Возвращает список всех пользователей в базе данных, включая их username, роль и ID.
 *     operationId: getUsers
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - data
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - username
 *                       - role
 *                       - email
 *                       - avatar
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Идентификатор пользователя.
 *                       username:
 *                         type: string
 *                         description: Имя пользователя.
 *                       role:
 *                         type: string
 *                         enum:
 *                          - USER
 *                          - ADMIN
 *                         description: Роль пользователя.
 *                       email:
 *                         type: string
 *                         description: Почта пользователя.
 *                       avatar:
 *                         type: string
 *                         description: Аватар пользователя.
 *       500:
 *         description: Ошибка получения списка пользователей.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки ("Список юзеров пуст").
 */

userRouter.get("/getUsers", authMiddleware, userController.getUsers);

/**
 * @swagger
 * user/deleteUser:
 *   delete:
 *     tags:
 *       - User
 *     summary: deleteUser - Удаление пользователя по ID
 *     description: Удаляет пользователя из базы данных по его ID.
 *     operationId: deleteUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Идентификатор пользователя, которого нужно удалить.
 *                 example: 1
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: Пользователь успешно удален.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об успешном удалении.
 *                   example: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке.
 *                   example: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки.
 *                   example: Произошла ошибка при удалении пользователя
 */
userRouter.delete("/deleteUser", authMiddleware, userController.deleteUser);
/**
 * @swagger
 * user/updateUser:
 *   put:
 *     tags:
 *       - User
 *     summary: updateUser - Редактирование пользователя по ID
 *     description: Обновляет данные пользователя (имя или роль) по его ID.
 *     operationId: updateUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Идентификатор пользователя.
 *                 example: 1
 *               username:
 *                 type: string
 *                 description: Новое имя пользователя.
 *                 example: newUsername
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 description: Новая роль пользователя.
 *                 example: ADMIN
 *               email:
 *                 type: string
 *                 description: Почта пользователя.
 *               avatar:
 *                 type: string
 *                 description: Аватар пользователя.
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Идентификатор пользователя.
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: Обновленное имя пользователя.
 *                   example: newUsername
 *                 role:
 *                   type: string
 *                   enum: [USER, ADMIN]
 *                   description: Новая роль пользователя.
 *                   example: ADMIN
 *                 email:
 *                   type: string
 *                   description: Почта пользователя.
 *                 avatar:
 *                   type: string
 *                   description: Аватар пользователя.
 *               required:
 *                 - id
 *       400:
 *         description: Некорректные данные или имя пользователя уже занято.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке.
 *                   example: Пользователь с таким username уже существует
 *       404:
 *         description: Пользователь не найден.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке.
 *                   example: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Описание ошибки.
 *                   example: Произошла ошибка при обновлении пользователя
 */
userRouter.put("/updateUser", authMiddleware, userController.updateUser);

export default userRouter;
