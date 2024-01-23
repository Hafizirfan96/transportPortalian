import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { vehiclesService, vendorLists } from './vehicleService';
import { vehicleServiceStateModel } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): vehicleServiceStateModel => {
  return {
    status: 'idle',
    error: null,
    vehicleServiceData: null,
    isLoading: false,
    isError: false,
    vendorList: [],
  };
};

const vehicleServiceSlice = createSlice({
  name: 'vehicleService',
  initialState: createDefaultState() as vehicleServiceStateModel,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(vehiclesService.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleServiceData: null,
        };
      })
      .addCase(
        vehiclesService.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            vehicleServiceData: action.payload,
          };
        },
      )
      .addCase(
        vehiclesService.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            isLoading: false,
            vehicleServiceData: null,
          };
        },
      )
      .addCase(vendorLists.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vendorList: null,
        };
      })
      .addCase(vendorLists.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vendorList: action.payload,
        };
      })
      .addCase(vendorLists.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          vendorList: null,
        };
      });
  },
});

export default vehicleServiceSlice.reducer;
export const vehicleServiceSelector = (state: RootState) =>
  state.vehicleService;
export const {} = vehicleServiceSlice.actions;
