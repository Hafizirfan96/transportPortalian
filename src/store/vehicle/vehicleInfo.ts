import { VehicleSearchModel, VehicleStartModel } from '@/interfaces';
import { VehicleEndModel } from '@/interfaces/requestModels/vehicleRequestModel';
import { vehicleService } from '@/services/Vehicle';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setVehicleData } from '.';
import { showToast } from '../appState';

export const getMyVehicles = createAsyncThunk(
  'vehicle/vehicleInfo',
  async (args: VehicleSearchModel, thunkAPI) => {
    try {
      const response = await vehicleService.getMyVehicles(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const startVehicle = createAsyncThunk(
  'vehicle/start',
  async (args: VehicleStartModel, thunkAPI) => {
    try {
      const response = await vehicleService.startVehicle(args);
      thunkAPI.dispatch(
        setVehicleData({
          ...response,
          ...args,
          km: args.StartKm,
          position: args.StartPosition,
          IsVehicleActive: true,
        }),
      );
      return response;
    } catch (error) {
      if (
        error?.response &&
        (error.response.status === 409 || error.response.status === 0)
      ) {
        const errorMessage = error.response.data.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: errorMessage,
          }),
        );
        throw error;
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);

export const endVehicle = createAsyncThunk(
  'vehicle/end',
  async (args: VehicleEndModel, thunkAPI) => {
    try {
      const response = await vehicleService.endVehicle(args);
      thunkAPI.dispatch(
        setVehicleData({
          ...args,
          id: 0,
          km: args.EndKm,
          position: args.EndPosition,
          IsVehicleActive: false,
        }),
      );
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: errorMessage,
          }),
        );
        return errorMessage;
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);

export const pickupLorry = createAsyncThunk(
  'tours/tourInfo',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.pickupLorry();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
