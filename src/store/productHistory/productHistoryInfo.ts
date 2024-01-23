import { productHistoryService } from '@/services/ProductHistory';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProductHistory = createAsyncThunk(
  'product/history',
  async (args, thunkAPI) => {
    try {
      const response = await productHistoryService.getProductHistory(args.kTId);
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
