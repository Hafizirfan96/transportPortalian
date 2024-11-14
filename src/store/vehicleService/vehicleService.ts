import { navigateBack } from '@/navigators/Root';
import { vehicleServices } from '@/services/vehicleService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../appState';

export const vehiclesService = createAsyncThunk(
  'vehicle/service',
  async (args: any, thunkAPI) => {
    try {
      const response = await vehicleServices.vehicleService(args);
      navigateBack();
      return response;
    } catch (error) {
      console.log(error);
      // thunkAPI.rejectWithValue(error);
      thunkAPI.dispatch(showToast ({
        type: 'error',
        text1: 'Error Message',
        text2: error,
      }));
    }
  },
);
export const vendorLists = createAsyncThunk(
  'vehicle/vendor',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleServices.vendorList();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
