import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthSlice {
  authorized: boolean;
  accessToken: string;
}

const initialState: AuthSlice = {
  authorized: localStorage.getItem("authToken") !== null ? true : false,
  accessToken: localStorage.getItem("authToken") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<string>) {
      state.authorized = true;
      state.accessToken = action.payload;
      localStorage.setItem("authToken", `${action.payload}`);
    },
    signOut(state) {
      state.authorized = false;
      state.accessToken = "";
      localStorage.removeItem("authToken");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
