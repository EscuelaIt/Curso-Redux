import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCountries = createAsyncThunk('country/fetchCountries', async (_, thunkAPI) => {
  const response = await fetch('https://timer.escuelait.com/api/countries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if(response.ok) {
    const json = await response.json();
    return thunkAPI.fulfillWithValue(json);
  } else {
    return thunkAPI.rejectWithValue({
      message: 'Error al traerse los países',
      errors: []
    })
  }
});

export const addCountry = createAsyncThunk('country/addCountry', async (country, thunkAPI) => {
  try {
    const response = await fetch('https://timer.escuelait.com/api/countries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(country),
    });
    if(response.ok) {
      const json = await response.json();
      return thunkAPI.fulfillWithValue(json);
    } else {
      const json = await response.json();
      return thunkAPI.rejectWithValue(json)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: 'Error al ejecutar la función asíncrona',
      errors: []
    })
  }
})

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    message: '',
    loading: false,
    error: null,
    validationErrors: []
  }, 
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchCountries.pending, (state, action) => {
    //   state.loading = true;
    // })
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload.data;
      state.message = action.payload.message;
      state.loading = false;
    })
    // builder.addCase(fetchCountries.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // builder.addCase(addCountry.pending, (state, action) => {
    //   state.loading = true;
    // })
    builder.addCase(addCountry.fulfilled, (state, action) => {
      state.countries.push(action.payload.data);
      state.message = action.payload.message;
      state.loading = false;
    })
    // builder.addCase(addCountry.rejected, (state, action) => {
    //   console.log(action.payload);
    //   state.loading = false;
    //   state.error = action.payload.message;
    //   state.validationErrors = action.payload.errors
    // })
    builder.addMatcher( 
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
      }
    )
    builder.addMatcher( 
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.validationErrors = action.payload.errors;
      }
    )
    //builder.addDefaultCase((state, action) => console.log('No conozco esta accion: ' + action.type));
  }
})