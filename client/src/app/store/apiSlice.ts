import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: __API__ }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
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
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useRegisterMutation } =
  apiSlice;
