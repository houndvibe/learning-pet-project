import { apiSlice as api } from "../../../shared/api/apiSlice";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersApiResponse, void>({
      query: () => ({ url: "user/getUsers" }),
      providesTags: ["Users"],
    }),

    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: ({ id }) => ({
        url: `user/getUser`,
        method: "GET",
        params: { id },
      }),
      providesTags: (result) => [{ type: "User", id: result?.data.id }],
    }),

    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: ({ body }) => ({
        url: "user/deleteUser",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: ({ body }) => ({
        url: "user/updateUser",
        method: "PUT",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "User", id: result?.data.id },
        "Users",
      ],
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as injectedRtkApi };

export type UserRoles = "USER" | "ADMIN";

export type GetUsersApiResponse = {
  data: {
    id: string;
    username: string;
    role: UserRoles;
    email?: string;
    avatar?: string;
    age?: number;
    bio?: string;
  }[];
};

export type GetUsersApiArg = void;

export type DeleteUserApiResponse = {
  message?: string;
};

export type DeleteUserApiArg = {
  body: {
    id: string;
  };
};

export type UpdateUserApiResponse = {
  data: {
    id: string;
    username?: string;
    role?: UserRoles;
    email?: string;
    avatar?: string;
    age?: number;
    bio?: string;
  };
};

export type UpdateUserApiArg = {
  body: {
    id: string;
    username?: string;
    role?: UserRoles;
    email?: string;
    avatar?: string;
    age?: number;
    bio?: string;
  };
};

export type GetUserApiResponse = {
  data: {
    id: string;
    username: string;
    role: UserRoles;
    email?: string;
    avatar?: string;
    age?: number;
    bio?: string;
  };
};

export type GetUserApiArg = {
  id: string;
};

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = injectedRtkApi;
