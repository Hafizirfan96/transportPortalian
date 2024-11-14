import { vehicleInspectionService } from '@/services/VehicleInspection';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../appState';

export const getInspection = createAsyncThunk(
  'vehicle/getInspection',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleInspectionService.getInspectionQuestions();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const createInspection = createAsyncThunk(
  'vehicle/createInspection',
  async (args: any, thunkAPI) => {
    try {
      const response =
        await vehicleInspectionService.createVehicleInspection(args);
      // if (response.InspectionId) {
      // }
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const registerDamage = createAsyncThunk(
  'vehicle/uploadDamageImages',
  async (args: any, thunkAPI) => {
    try {
      const response = await vehicleInspectionService.uploadDamageImages(args);
      thunkAPI.dispatch(
        showToast({
          type: 'success',
          text1: 'Success Message',
          text2: response.Message,
        }),
      );
      return response;
    } catch (error: any) {
      thunkAPI.dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: 'image can not uploaded',
        }),
      );
      thunkAPI.rejectWithValue(error);
    }
  },
);
