import { workloadService } from '@/services/workload';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const myWorkloads = createAsyncThunk(
  'workload/myworkload',
  async (args, thunkAPI) => {
    try {
      const response = await workloadService.myWorkloads();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const startWorkload = createAsyncThunk(
  'workload/start',
  async (args, thunkAPI) => {
    try {
      const response = await workloadService.startWorkload(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const endWorkload = createAsyncThunk(
  'workload/end',
  async (args, thunkAPI) => {
    try {
      const response = await workloadService.endWorkload(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteWorkload = createAsyncThunk(
  'workload/delete',
  async (args, thunkAPI) => {
    try {
      const response = await workloadService.deleteWorkload(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
