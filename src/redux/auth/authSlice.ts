import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userName: "",
    userEmail: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    registerReducer: (state, action) => {
      state.user.userName = action.payload.name;
      state.user.userEmail = action.payload.email;
      state.isAuthenticated = true;
    },
    loginReducer: (state, action) => {
      state.user.userEmail = action.payload.email;
      state.user.userName = action.payload.name;
      state.isAuthenticated = true;
    },
    logoutReducer: (state) => {
      state.user = { userName: "", userEmail: "" };
      state.isAuthenticated = false;
    },
  },
});

export const { loginReducer, logoutReducer, registerReducer } =
  authSlice.actions;
export default authSlice.reducer;
