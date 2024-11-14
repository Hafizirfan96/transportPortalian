import { TourStartRequestModel } from '@/interfaces';
import { tourService } from '@/services/Tour';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateTour } from '@/store/tour';
import { showToast } from '../appState';
import { navigateBack } from '@/navigators/Root';

export const tourInfo = createAsyncThunk(
  'tour/tourInfo',
  async (args, thunkAPI) => {
    try {
      const response = await tourService.getMyTours();
      return response;
    } catch (error) {
      let errorMessage =
        error.response.status.toString() === '0'
          ? 'Network Error'
          : error.message;
      thunkAPI.dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: errorMessage,
        }),
      );
      throw error;
    }
  },
);

export const startTour = createAsyncThunk(
  'tour/start',
  async (args: TourStartRequestModel, thunkAPI) => {
    try {
      const response = await tourService.startTour(args);
      thunkAPI.dispatch(
        UpdateTour({
          ...response,
          IsTourActive: true,
        }),
      );
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message
          ? error.response.data.message
          : error.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: JSON.stringify(errorMessage),
          }),
        );
        thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        thunkAPI.rejectWithValue(error);
        const errorMessage = error.response.data.message
          ? error.response.data.message
          : error.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: JSON.stringify(errorMessage),
          }),
        );
      }
    }
  },
);
export const endTour = createAsyncThunk(
  'tour/end',
  async (args: any, thunkAPI) => {
    try {
      const response = await tourService.endTour(args);
      thunkAPI.dispatch(
        UpdateTour({
          id: 0,
          guid: '00000000-0000-0000-0000-000000000000',
          IsTourActive: false,
        }),
      );
      navigateBack();
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);
