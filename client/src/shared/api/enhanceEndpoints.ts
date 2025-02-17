import { injectedRtkApi } from "./generatedApi";

export const enhancedApi = injectedRtkApi.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    getUsers: {
      providesTags: ["User"],
    },
    deleteUser: {
      invalidatesTags: ["User"],
    },
  },
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useDeleteUserMutation } =
  enhancedApi;
