import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    msg: 'Mensaje inicial',
    counter: 0,
  }
});