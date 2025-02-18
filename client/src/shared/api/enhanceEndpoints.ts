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
    updateUser: {
      invalidatesTags: ["User"],
    },
    registration: {
      invalidatesTags: ["User"],
    },
  },
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useDeleteUserMutation,
  useRegistrationMutation,
  useUpdateUserMutation,
} = enhancedApi;
