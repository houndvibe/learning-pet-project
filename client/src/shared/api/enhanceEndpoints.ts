/* import { injectedRtkApi } from "./generatedApi";

// Добавляем теги сегенерированному api
export const enhancedApi = injectedRtkApi.enhanceEndpoints({
  addTagTypes: ["Users"],
  endpoints: {
    getUsers: {
      providesTags: ["Users"],
    },
    deleteUser: {
      invalidatesTags: ["Users"],
    },
    updateUser: {
      invalidatesTags: ["Users"],
    },
    registration: {
      invalidatesTags: ["Users"],
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
 */
