import { createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./app-slice";

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: []
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    }
  }
});

export const { setCountries } = countrySlice.actions;

// https://timer.escuelait.com/api/countries
// export const getCountries = (dispatch) => {
//   // ir al web service (api) recuperar los paises
//   fetch('https://timer.escuelait.com/api/countries')
//     .then((response) => response.json())
//     .then(json => dispatch(setCountries(json.data)))  
// }

export const getCountries = (keyword) => async (dispatch) => {
  const response = await fetch(`https://timer.escuelait.com/api/countries?keyword=${keyword}`);
  const json = await response.json();
  dispatch(setCountries(json.data));
  dispatch(setMessage(`Se han encontrado ${json.data.length} países`));
}