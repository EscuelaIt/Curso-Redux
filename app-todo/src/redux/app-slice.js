import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    message: '',
  }, 
  reducers: {
    sendFeedback: (state, action) => {
      state.message = action.payload;
    }
  }
});

export const { sendFeedback } = appSlice.actions;