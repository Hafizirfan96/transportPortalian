import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getlocationApi } from './location';
const createDefaultState = (): any => {
  return {
    isLocationLoading: false,
    location: null,
    lat: null,
    long: null,
    error: null,
    status: 'idle',
  };
};

const locationSlice = createSlice({
  name: 'location',
  initialState: createDefaultState(),
  reducers: {
    setlocation: (state, action) => {
      state.location = action.payload.location;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getlocationApi.pending, state => {
        return {
          ...state,
          status: 'pending',
          error: null,
          isLocationLoading: true,
        };
      })
      .addCase(getlocationApi.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          location: action.payload.location,
          lat: action.payload.lat,
          long: action.payload.long,
          error: null,
          isLocationLoading: false,
        };
      })
      .addCase(getlocationApi.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLocationLoading: false,
        };
      });
  },
});

export default locationSlice.reducer;
export const locationSelector = (state: RootState) => state.location;
export const { setlocation } = locationSlice.actions;
