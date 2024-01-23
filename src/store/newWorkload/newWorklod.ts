import { newWorkloadService } from '@/services/newWorload';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { navigateBack } from '@/navigators/Root';

export const newWorkload = createAsyncThunk(
  'new/workload',
  async (args, thunkAPI) => {
    try {
      const response = await newWorkloadService.newWorkload(args);
      return response;
    } catch (error) {
      if (error?.response.data.errors && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
export const createNewWorkloads = createAsyncThunk(
  'create/workload',
  async (args, thunkAPI) => {
    try {
      const response = await newWorkloadService.createNewWorkload(args);
      navigateBack();
      return response;
    } catch (error) {
      if (error?.response.data.errors && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
