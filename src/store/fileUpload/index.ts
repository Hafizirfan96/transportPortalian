import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fileUpload } from './fileUploadd';
import { signatureState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): signatureState => {
  return {
    status: 'idle',
    error: null,
    isLoading: false,
    fileUploadImage: [],
    SignatureID: null,
  };
};

const fileUploadSlice = createSlice({
  name: 'signatures',
  initialState: createDefaultState() as signatureState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fileUpload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          fileUploadImage: null,
        };
      })
      .addCase(fileUpload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          error: null,
          fileUploadImage: action.payload,
        };
      })
      .addCase(fileUpload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          fileUploadImage: null,
        };
      });
  },
});

export default fileUploadSlice.reducer;
export const fileUploadSelector = (state: RootState) => state.fileUpoad;
export const {} = fileUploadSlice.actions;
