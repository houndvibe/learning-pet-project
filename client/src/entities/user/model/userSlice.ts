import { createSlice } from "@reduxjs/toolkit";

export interface UserSlice {
  authorized: boolean;
}

const initialState: UserSlice = {
  authorized: localStorage.getItem("auth") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state) {
      state.authorized = true;
    },
    signOut(state) {
      state.authorized = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
