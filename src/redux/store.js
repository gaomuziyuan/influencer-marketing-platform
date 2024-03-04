import { configureStore } from "@reduxjs/toolkit";
import { defaultReducer } from "./reducers";
import { defaultTheme } from "../themes";

export const initialState = {
  user: null,
  theme: defaultTheme,
};

export const store = configureStore({
  reducer: defaultReducer,
});
