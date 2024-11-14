import { logService } from '@/services/LogService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logInfo = createAsyncThunk(
  'loginfo',
  async (args: any, thunkAPI) => {
    try {
      const response = await logService.logInfo(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
