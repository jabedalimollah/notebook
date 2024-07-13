import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getData } = userSlice.actions;

export default userSlice.reducer;

// https://redux-toolkit.js.org/tutorials/quick-start
