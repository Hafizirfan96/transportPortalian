import { signatureService } from '@/services/signature';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const saveSignatureImages = createAsyncThunk(
  'signature/service',
  async (args, thunkAPI) => {
    try {
      const response = await signatureService.saveSignatureImage(args);
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

export const getProductsWorkload = createAsyncThunk(
  'signature/create',
  async (args, thunkAPI) => {
    try {
      const response = await signatureService.createSignature(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
