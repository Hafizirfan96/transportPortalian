import { logOutService } from '@/services/logout';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from '@/store';
import StorageService from '@/services/StorageService';

export const logOutAndReset = createAsyncThunk(
  'logout',
  async (args, thunkAPI) => {
    try {
      const response = await logOutService.logOut();
      storage.clearAll();
      StorageService.clearAll();
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
