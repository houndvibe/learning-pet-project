import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<RegistrationApiResponse, RegistrationApiArg>({
      query: (queryArg) => ({
        url: `/user/registration`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Users"],
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/user/login`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    refresh: build.mutation<RefreshApiResponse, RefreshApiArg>({
      query: (queryArg) => ({
        url: `user/refresh`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    checkAuth: build.query<CheckAuthApiResponse, CheckAuthApiArg>({
      query: () => ({ url: `user/checkAuth` }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `user/getUsers` }),
      providesTags: ["Users"],
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `user/deleteUser`,
        method: "DELETE",
        body: queryArg.body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `user/updateUser`,
        method: "PUT",
        body: queryArg.body,
      }),
      invalidatesTags: ["Users"],
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
export type GetUsersApiResponse = {
  data: {
    id: string;
    username: string;
    role: UserRoles;
    email?: string;
    avatar?: string;
  }[];
};
export type GetUsersApiArg = void;
export type DeleteUserApiResponse = {
  message?: string;
};
export type DeleteUserApiArg = {
  body: {
    userId: string;
  };
};
export type UpdateUserApiResponse = {
  id: string;
  username?: string;
  role?: UserRoles;
  email?: string;
  avatar?: string;
};
export type UpdateUserApiArg = {
  body: {
    id: string;
    username?: string;
    role?: UserRoles;
    email?: string;
    avatar?: string;
  };
};
export const {
  useRegistrationMutation,
  useLoginMutation,
  useRefreshMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = injectedRtkApi;
