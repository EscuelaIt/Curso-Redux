import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    msg: 'Mensaje inicial',
    counter: 0,
  },
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
  },
});

export const { increment, decrement } = appSlice.actions;