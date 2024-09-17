import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    message: '',
    statusMessage: ''
  }, 
  reducers: {
    setMessage: (state, action) => {
      // action.payload = { msg: 'dfsdfd', status: 'error'}
      state.message = action.payload.msg;
      state.statusMessage = action.payload.status;
    }
  }
});

export const { setMessage } = appSlice.actions;

export const sendFeedback = (msg, status = 'success') => (dispatch) => {
  dispatch(setMessage({
    msg,
    status
  }));
}