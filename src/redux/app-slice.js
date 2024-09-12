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
    decrement: (state, action) => {
      state.counter -= action.payload;
    },
    setMessage: (state, action) => {
      console.log(action);
      state.msg = action.payload;
    }
  },
});

export const { increment, decrement, setMessage } = appSlice.actions;