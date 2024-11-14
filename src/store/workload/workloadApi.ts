import { WorkloadStartModel } from '@/interfaces';
import { workloadService } from '@/services/Workload';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { workLoadStatusChange, workloadSelected } from '.';

export const myWorkloads = createAsyncThunk(
  'workload/myworkload',
  async (args, thunkAPI) => {
    try {
      console.log('called workload items');
      let response: any = await workloadService.myWorkloads();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const startWorkload = createAsyncThunk(
  'workload/start',
  async (args: WorkloadStartModel, thunkAPI) => {
    try {
      const response = await workloadService.startWorkload(args);
      thunkAPI.dispatch(workLoadStatusChange({ ...args, endWorkload: false }));
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const endWorkload = createAsyncThunk(
  'workload/end',
  async (args: any, thunkAPI) => {
    try {
      const response = await workloadService.endWorkload(args);
      thunkAPI.dispatch(
        workLoadStatusChange({
          endWorkload: true,
          WorkloadEndStatus: args.WorkloadEndStatus,
        }),
      );
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteWorkload = createAsyncThunk(
  'workload/delete',
  async (args: any, thunkAPI) => {
    try {
      const response = await workloadService.deleteWorkload(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);
