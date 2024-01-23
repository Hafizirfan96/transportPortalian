import { Config } from '@/config';
import { shiftService } from '@/services/shift';
import StorageService from '@/services/StorageService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const startShift = createAsyncThunk(
  'shift/Start',
  async (args: any, thunkAPI) => {
    try {
      const response = await shiftService.startShift(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const endShift = createAsyncThunk(
  'shift/End',
  async (args: any, thunkAPI) => {
    try {
      const response = await shiftService.endShift(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const myStartedShifts = createAsyncThunk(
  'shift/myStartedShifts',
  async (args, thunkAPI) => {
    try {
      const response = await shiftService.mineStartedShift();
      if (response) {
        StorageService.set(Config.KEYS.SHIFT_INFO, response);
      }
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
