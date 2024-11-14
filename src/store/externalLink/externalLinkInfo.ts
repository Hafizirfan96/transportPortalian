import { createAsyncThunk } from '@reduxjs/toolkit';
import { externalLinkService } from '@/services/ExternalLink';

export const externalLinkInfo = createAsyncThunk(
  'externalLink',
  async (args: any, thunkAPI) => {
    try {
      const response = await externalLinkService.externalLink(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
