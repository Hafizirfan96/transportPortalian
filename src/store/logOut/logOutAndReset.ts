import { logOutService } from '@/services/logout';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { reduxStorage, storage } from '@/store';
import StorageService from '@/services/StorageService';

export const logOutAndReset = createAsyncThunk(
  'logout',
  async (args, thunkAPI) => {
    try {
      const response = await logOutService.logOut();
      await StorageService.clearAll();
      await reduxStorage.clearAll();
      await storage.clear();
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
