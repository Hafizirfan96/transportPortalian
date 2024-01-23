import { vehicleInspectionService } from '@/services/vehicleInspection';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
  async (args, thunkAPI) => {
    try {
      const response = await vehicleInspectionService.createVehicleInspection(
        args,
      );
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
