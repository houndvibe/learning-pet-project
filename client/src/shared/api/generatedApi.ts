import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<RegistrationApiResponse, RegistrationApiArg>({
      query: (queryArg) => ({
        url: `/registration`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `user/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    refresh: build.mutation<RefreshApiResponse, RefreshApiArg>({
      query: (queryArg) => ({
        url: `/refresh`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    checkAuth: build.query<CheckAuthApiResponse, CheckAuthApiArg>({
      query: () => ({ url: `user/checkAuth` }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/getUsers` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userApi };
export type RegistrationApiResponse = /** status 200 Токен авторизации */ {
  /** Токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type RegistrationApiArg = {
  body: {
    /** Уникальное имя пользователя. */
    username?: string;
    /** Пароль пользователя. */
    password?: string;
    /** Роль пользователя. */
    role?: string;
  };
};
export type LoginApiResponse = /** status 200 Успешная аутентификация */ {
  /** JWT-токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type LoginApiArg = {
  body: {
    /** Имя пользователя */
    username?: string;
    /** Пароль пользователя */
    password?: string;
  };
};
export type RefreshApiResponse = /** status 200 Токен авторизации */ {
  /** Токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type RefreshApiArg = {
  body: {
    /** Имя пользователя. */
    username?: string;
    /** Пароль пользователя. */
    password?: string;
  };
};
export type CheckAuthApiResponse = /** status 200 Новый токен авторизации */ {
  /** Новый токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type CheckAuthApiArg = void;
export type GetUsersApiResponse = /** status 200 Список пользователей */ {
  data?: {
    /** Идентификатор пользователя. */
    id?: number;
    /** Имя пользователя. */
    username?: string;
    /** Роль пользователя. */
    role?: string;
  }[];
};
export type GetUsersApiArg = void;
export const {
  useRegistrationMutation,
  useLoginMutation,
  useRefreshMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = injectedRtkApi;
