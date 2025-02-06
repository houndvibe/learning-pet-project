import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../shared/api/apiSlice";
import { authSlice } from "../../features/Auth/model/authSlice";
import { rtkQueryErrorLogger } from "./errorMiddleware";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
