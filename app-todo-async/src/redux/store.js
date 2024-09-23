import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import { todoSlice } from "./todo-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    todo: todoSlice.reducer,
  }
})