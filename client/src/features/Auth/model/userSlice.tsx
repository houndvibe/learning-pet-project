/* import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
  userData: {
    id: string;
    email: string;
    username: string;
    avatar: string | null;
    tole: "ADMIN" | "USER";
  };
}

const initialState: UserSlice = {
  userData: {
    id: "",
    email: "",
    username: "",
    avatar: null,
    tole: "ADMIN",
  },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    serUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
 */
