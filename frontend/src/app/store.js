import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import notesReducer from "../features/notes/notesSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});
