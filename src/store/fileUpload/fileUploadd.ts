import { fileUploadService } from '@/services/fileUpload';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fileUpload = createAsyncThunk(
  'file/upload',
  async (args, thunkAPI) => {
    try {
      console.log('args------:', args);
      const response = await fileUploadService.fileUpload(args);
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
