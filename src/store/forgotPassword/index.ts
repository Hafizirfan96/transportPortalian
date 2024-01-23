import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fogotInfo } from './forgotInfo';
import { forgotState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): forgotState => {
  return {
    status: 'idle',
    error: null,
    isLoading: false,
    value: false,
    isError: false,
  };
};

const forgotInfoSlice = createSlice({
  name: 'forgot',
  initialState: createDefaultState() as forgotState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fogotInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          value: false,
          isError: false,
        };
      })
      .addCase(fogotInfo.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          isError: true,
          value: action.payload,
          error: null,
        };
      })
      .addCase(fogotInfo.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          value: false,
          isError: true,
          isLoading: false,
        };
      });
  },
});

export default forgotInfoSlice.reducer;
export const forgotSelector = (state: RootState) => state.forgot;
export const {} = forgotInfoSlice.actions;
