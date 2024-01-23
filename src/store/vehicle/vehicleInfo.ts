import { vehicleService } from '@/services/vehicle';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyVehicles = createAsyncThunk(
  'vehicle/vehicleInfo',
  async (args, thunkAPI) => {
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
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.startVehicle(args);
      return response;
    } catch (error) {
      if (
        error?.response &&
        (error.response.status === 409 || error.response.status === 0)
      ) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);

export const endVehicle = createAsyncThunk(
  'vehicle/end',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.endVehicle(args);
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
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
