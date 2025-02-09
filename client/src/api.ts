import { apiSlice as api } from "./shared/api/apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postRegistration: build.mutation<
      PostRegistrationApiResponse,
      PostRegistrationApiArg
    >({
      query: (queryArg) => ({
        url: `/registration`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postRefresh: build.mutation<PostRefreshApiResponse, PostRefreshApiArg>({
      query: () => ({ url: `/refresh`, method: "POST" }),
    }),
    postLogin: build.mutation<PostLoginApiResponse, PostLoginApiArg>({
      query: (queryArg) => ({
        url: `/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCheckAuth: build.query<GetCheckAuthApiResponse, GetCheckAuthApiArg>({
      query: () => ({ url: `/checkAuth` }),
    }),
    getGetUsers: build.query<GetGetUsersApiResponse, GetGetUsersApiArg>({
      query: () => ({ url: `/getUsers` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userApi };
export type PostRegistrationApiResponse = /** status 200 Токен авторизации */ {
  /** Токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type PostRegistrationApiArg = {
  body: {
    /** Уникальное имя пользователя. */
    username?: string;
    /** Пароль пользователя. */
    password?: string;
    /** Роль пользователя. */
    role?: string;
  };
};
export type PostRefreshApiResponse = /** status 200 Новый токен авторизации */ {
  /** Новый токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type PostRefreshApiArg = void;
export type PostLoginApiResponse = /** status 200 Токен авторизации */ {
  /** Токен для доступа к защищенным маршрутам. */
  token?: string;
};
export type PostLoginApiArg = {
  body: {
    /** Имя пользователя. */
    username?: string;
    /** Пароль пользователя. */
    password?: string;
  };
};
export type GetCheckAuthApiResponse =
  /** status 200 Новый токен авторизации */ {
    /** Новый токен для доступа к защищенным маршрутам. */
    token?: string;
  };
export type GetCheckAuthApiArg = void;
export type GetGetUsersApiResponse = /** status 200 Список пользователей */ {
  data?: {
    /** Идентификатор пользователя. */
    id?: number;
    /** Имя пользователя. */
    username?: string;
    /** Роль пользователя. */
    role?: string;
  }[];
};
export type GetGetUsersApiArg = void;
export const {
  usePostRegistrationMutation,
  usePostRefreshMutation,
  usePostLoginMutation,
  useGetCheckAuthQuery,
  useLazyGetCheckAuthQuery,
  useGetGetUsersQuery,
  useLazyGetGetUsersQuery,
} = injectedRtkApi;
