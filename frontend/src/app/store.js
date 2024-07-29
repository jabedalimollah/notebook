import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import notesReducer from "../features/notes/notesSlice";
import menuReducer from "../features/menu/menuSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    menu: menuReducer,
  },
});
