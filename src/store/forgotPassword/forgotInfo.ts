import { navigate } from '@/navigators/Root';
import { forgotPasswordService } from '@/services/ForgotPassword';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fogotInfo = createAsyncThunk(
  'forgot/password',
  async (args, thunkAPI) => {
    try {
      const response = await forgotPasswordService.forgotPassword(args);
      navigate('ResetPassword');

      return response;
    } catch (error) {
      if (error?.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
