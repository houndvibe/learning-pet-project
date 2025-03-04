import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRoles } from "~shared/api/userEndpoints";

export interface UserData {
  id: string;
  role: UserRoles;
  username: string;
  email?: string | undefined;
  avatar?: string | undefined;
}
export interface AuthSlice {
  authorized: boolean;
  accessToken: string;
  userData: UserData;
}

const initialState: AuthSlice = {
  authorized: localStorage.getItem("authToken") !== null ? true : false,
  accessToken: localStorage.getItem("authToken") || "",
  userData: JSON.parse(localStorage.getItem("userData") as string) || {
    id: "",
    role: "USER",
    username: "",
    email: undefined,
    avatar: undefined,
  },
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
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
      localStorage.setItem("userData", `${JSON.stringify(action.payload)}`);
    },
  },
});

export const { signIn, signOut, setUserData } = authSlice.actions;
