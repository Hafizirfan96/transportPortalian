import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getMyVehicles,
  startVehicle,
  endVehicle,
  pickupLorry,
} from './vehicleInfo';
import { VehicleState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): VehicleState => {
  return {
    status: 'idle',
    error: '',
    vehicleData: null,
    isLoading: false,
    vehicleStartData: null,
    isError: false,
  };
};

const vehicleInfoSlice = createSlice({
  name: 'vehicle',
  initialState: createDefaultState() as VehicleState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMyVehicles.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleData: null,
          isError: false,
        };
      })
      .addCase(getMyVehicles.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vehicleData: action.payload,
          isError: false,
        };
      })
      .addCase(getMyVehicles.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          vehicleData: null,
          isError: true,
        };
      })
      // start vehicle
      .addCase(startVehicle.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleStartData: null,
          isError: false,
        };
      })
      .addCase(startVehicle.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vehicleStartData: action.payload,
          isError: false,
        };
      })
      .addCase(startVehicle.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          vehicleData: null,
          isLoading: false,
          isError: true,
          vehicleStartData: null,
        };
      });
    // end vehicle
    builder.addCase(endVehicle.pending, state => {
      return {
        ...state,
        loading: 'pending',
        error: null,
        isLoading: true,
        isError: false,
      };
    });
    builder.addCase(
      endVehicle.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          vehicleData: action.payload,
          isLoading: false,
          isError: false,
        };
      },
    );
    builder
      .addCase(endVehicle.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          vehicleData: null,
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
          isLoading: true,
          isError: false,
        };
      })
      .addCase(pickupLorry.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          vehicleData: action.payload,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(pickupLorry.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          vehicleData: null,
          isLoading: false,
          isError: true,
        };
      });
  },
});

export default vehicleInfoSlice.reducer;
export const vehicleSelector = (state: RootState) => state.vehicle;
export const {} = vehicleInfoSlice.actions;
