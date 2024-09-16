import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app-slice';
import { userSlice } from './user-slice';
import { countrySlice } from './country-slice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    country: countrySlice.reducer,
  }
});
