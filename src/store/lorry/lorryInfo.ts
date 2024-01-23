import { vehicleService } from '@/services/vehicle';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyLorries = createAsyncThunk(
  'lorri/vehicleInfo',
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

export const startLorri = createAsyncThunk(
  'lorri/start',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.startVehicle(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const endLorri = createAsyncThunk(
  'lorri/end',
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
  'tour/tourInfo',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.pickupLorry(args);
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
