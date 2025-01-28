import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import store, { RootState } from "./rootStore";
import { signOut } from "~entities/user/model/userSlice";

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const reducers = getState() as RootState;
      if (
        reducers.user.authorized === true &&
        endpoint !== "/user/registration" &&
        endpoint !== "/user/login"
      ) {
        headers.set("Cache-Control", "cache");
        headers.set("Authorization", `Bearer ${reducers.user.accessToken}`);
      }
      return headers.set("Cache-Control", "cache");
    },
  })(args, api, extraOptions);

  if (result.error?.status === 401) {
    store.dispatch(signOut());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/getUsers",
    }),
    checkAuth: builder.query({
      query: () => "/user/checkAuth",
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
  useLazyCheckAuthQuery,
} = apiSlice;
