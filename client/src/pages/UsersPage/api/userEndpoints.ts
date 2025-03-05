import { apiSlice as api } from "../../../shared/api/apiSlice";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    id: string;
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
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = injectedRtkApi;
