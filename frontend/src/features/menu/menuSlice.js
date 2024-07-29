import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuToggle: (state) => {
      // console.log("action", action.payload);
      //   console.log(state.value);
      state.value = !state.value;
      //   state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { menuToggle } = menuSlice.actions;

export default menuSlice.reducer;

// https://redux-toolkit.js.org/tutorials/quick-start
