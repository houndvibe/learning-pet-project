import { apiSlice as api } from "~shared/api/apiSlice";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<RegistrationApiResponse, RegistrationApiArg>({
      query: (queryArg) => ({
        url: `/auth/registration`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Users"],
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    refresh: build.mutation<RefreshApiResponse, RefreshApiArg>({
      query: (queryArg) => ({
        url: `auth/refresh`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    checkAuth: build.query<CheckAuthApiResponse, CheckAuthApiArg>({
      query: () => ({ url: `auth/checkAuth` }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as injectedRtkApi };

export type UserRoles = "USER" | "ADMIN";

export type RegistrationApiResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    role: UserRoles;
    email?: string;
    avatar?: string;
  };
};
export type RegistrationApiArg = {
  body: {
    username: string;
    password: string;
    role: UserRoles;
  };
};
export type LoginApiResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
    role: UserRoles;
    avatar?: string;
  };
};
export type LoginApiArg = {
  body: {
    username: string;
    password: string;
  };
};
export type RefreshApiResponse = {
  token: string;
};
export type RefreshApiArg = {
  body: {
    username: string;
    password: string;
  };
};
export type CheckAuthApiResponse = {
  token: string;
};
export type CheckAuthApiArg = void;

export const {
  useRegistrationMutation,
  useLoginMutation,
  useRefreshMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
} = injectedRtkApi;
