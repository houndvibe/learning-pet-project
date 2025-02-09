import { apiSlice as api } from "./apiSlice";

export const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ["User"],
  //почему то не работают
  endpoints: {
    getUsers(endpoint) {
      endpoint.providesTags = ["User"];
    },
    login(endpoint) {
      endpoint.invalidatesTags = ["User"];
    },
  },
});
