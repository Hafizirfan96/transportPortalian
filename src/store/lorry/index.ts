import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getMyLorries, startLorri, endLorri, pickupLorry } from './lorryInfo';
import { lorryState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): lorryState => {
  return {
    status: 'idle',
    error: null,
    lorryData: null,
    isLoading: false,
    vehicleStartData: null,
    isError: false,
  };
};

const lorriInfoSlice = createSlice({
  name: 'lorries',
  initialState: createDefaultState() as lorryState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMyLorries.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          lorryData: null,
          isError: false,
        };
      })
      .addCase(getMyLorries.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          lorryData: action.payload,
          // isError: false,
        };
      })
      .addCase(getMyLorries.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          lorryData: null,
          // isError: true,
        };
      })
      // start vehicle
      // .addCase(startLorri.pending, state => {
      //   return {
      //     ...state,
      //     loading: 'pending',
      //     error: null,
      //     isLoading: true,
      //     vehicleStartData: null,
      //     isError: false,
      //   };
      // })
      // .addCase(startLorri.fulfilled, (state, action: PayloadAction<any>) => {
      //   return {
      //     ...state,
      //     status: 'succeeded',
      //     isLoading: false,
      //     vehicleStartData: action.payload,
      //     isError: false,
      //   };
      // })
      // .addCase(startLorri.rejected, (state, action: PayloadAction<any>) => {
      //   return {
      //     ...state,
      //     status: 'failed',
      //     error: action.payload as string,
      //     lorryData: null,
      //     isLoading: false,
      //     vehicleStartData: null,
      //     isError: true,
      //   };
      // })
      // end vehicle
      .addCase(endLorri.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          isError: false,
        };
      })
      .addCase(endLorri.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          lorryData: action.payload,
          isError: false,
          isLoading: false,
        };
      })
      .addCase(endLorri.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          lorryData: null,
          isLoading: false,
          isError: true,
        };
      })
      //pickupLorry

      .addCase(pickupLorry.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(pickupLorry.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          lorryData: action.payload,
          isLoading: false,
          error: null,
          isError: false,
        };
      })
      .addCase(pickupLorry.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          lorryData: null,
          isLoading: false,
          isError: true,
        };
      });
  },
});

export default lorriInfoSlice.reducer;
export const lorriSelector = (state: RootState) => state.lorry;
export const {} = lorriInfoSlice.actions;
