import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import { todoSlice } from "./todo-slice";
import { countrySlice } from "./country-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    todo: todoSlice.reducer,
    country: countrySlice.reducer,
  }
})