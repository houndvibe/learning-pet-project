import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: __API__ }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/getUsers",
    }),

    register: builder.mutation({
      query: (arg) => ({
        url: "/user/registration",
        method: "POST",
        body: {
          password: arg.password,
          username: arg.username,
          role: arg.role,
        },
      }),
    }),
    login: builder.mutation({
      query: (arg) => ({
        url: "/user/login",
        method: "POST",
        body: {
          password: arg.password,
          username: arg.username,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useRegisterMutation,
  useLoginMutation,
} = apiSlice;
