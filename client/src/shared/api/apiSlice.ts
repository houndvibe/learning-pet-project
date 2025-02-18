import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import store, { RootState } from "~app/store/rootStore";
import { signIn, signOut } from "~features/Auth/model/authSlice";

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: __API__,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const reducers = getState() as RootState;
      if (
        reducers.auth.authorized === true &&
        endpoint !== "/user/registration" &&
        endpoint !== "/user/login"
      ) {
        headers.set("Cache-Control", "cache");
        headers.set("Authorization", `Bearer ${reducers.auth.accessToken}`);
      }
      return headers.set("Cache-Control", "cache");
    },
  })(args, api, extraOptions);

  if (result.error?.status === 401) {
    store.dispatch(signOut());
  }

  return result;
};

type RefreshResultDataType = {
  token: string;
};
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQueryWithAuth(
      {
        url: "/user/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(signIn((refreshResult.data as RefreshResultDataType).token));
      result = await baseQueryWithAuth(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
