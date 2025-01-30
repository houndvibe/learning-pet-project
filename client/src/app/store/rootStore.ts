import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userSlice } from "../../entities/user/model/userSlice";
import { rtkQueryErrorLogger } from "./errorMiddleware";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
