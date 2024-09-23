import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    message: '',
    statusMessage: '',
    loading: false,
  }, 
  reducers: {
    setMessage: (state, action) => {
      // action.payload = { msg: 'dfsdfd', status: 'error'}
      state.message = action.payload.msg;
      state.statusMessage = action.payload.status;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    }
  }
});

export const { setMessage, startLoading, stopLoading } = appSlice.actions;

export const sendFeedback = (msg, status = 'success') => (dispatch) => {
  dispatch(setMessage({
    msg,
    status
  }));
}