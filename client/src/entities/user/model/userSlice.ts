import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
  authorized: boolean;
  accessToken: string;
}

const initialState: UserSlice = {
  authorized: localStorage.getItem("authToken") !== null ? true : false,
  accessToken: localStorage.getItem("authToken") || "",
};

export const userSlice = createSlice({
  name: "user",
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

export const { signIn, signOut } = userSlice.actions;
