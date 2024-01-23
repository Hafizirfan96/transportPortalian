import { tourService } from '@/services/tour';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const tourInfo = createAsyncThunk(
  'tour/tourInfo',
  async (args, thunkAPI) => {
    try {
      const response = await tourService.getMyTours();
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const startTour = createAsyncThunk(
  'tour/start',
  async (args, thunkAPI) => {
    try {
      const response = await tourService.startTour(args);
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
export const endTour = createAsyncThunk('tour/end', async (args, thunkAPI) => {
  try {
    const response = await tourService.endTour(args);
    return response.data;
  } catch (error) {
    console.log(error);
    thunkAPI.rejectWithValue(error);
  }
});
