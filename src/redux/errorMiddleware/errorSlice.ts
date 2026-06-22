import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
};

const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    setErrorPopup: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorPopup: (state) => {
      state.errorMessage = "";
    },
  },
});

export const { setErrorPopup, clearErrorPopup } = errorSlice.actions;

export default errorSlice.reducer;
