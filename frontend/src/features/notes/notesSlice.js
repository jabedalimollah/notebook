import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    allNotes: (state, action) => {
      // console.log("action", action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { allNotes } = userSlice.actions;

export default userSlice.reducer;

// https://redux-toolkit.js.org/tutorials/quick-start
