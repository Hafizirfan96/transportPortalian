import { Config } from '../../Config/index';
import { shiftService } from '@/services/shift';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../appState';
import { text } from 'stream/consumers';

export const startShift = createAsyncThunk(
  'shift/Start',
  async (args: any, thunkAPI) => {
    try {
      const response = await shiftService.startShift(args);
      return response;
    } catch (error) {
      throw error;
      // thunkAPI.rejectWithValue(error);
    }
  },
);

export const endShift = createAsyncThunk(
  'shift/End',
  async (args: any, thunkAPI) => {
    try {
      const response = await shiftService.endShift(args);
      if (response) {
        return response;
      }
    } catch (error) {
      if (error.response.data.message && error.response.status === 409) {
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: error.response.data.message,
          }),
        );
        // thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  },
);

export const myStartedShifts: any = createAsyncThunk(
  'shift/myStartedShifts',
  async (args, thunkAPI) => {
    try {
      const response = await shiftService.mineStartedShift();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
