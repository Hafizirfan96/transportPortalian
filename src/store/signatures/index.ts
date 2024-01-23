import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { saveSignatureImages, getProductsWorkload } from './signatureInfo';
import { signatureState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): signatureState => {
  return {
    status: 'idle',
    error: null,
    isLoading: false,
    signatureImage: null,
    SignatureID: null,
  };
};

const signatureSlice = createSlice({
  name: 'signatures',
  initialState: createDefaultState() as signatureState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveSignatureImages.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          signatureImage: null,
        };
      })
      .addCase(
        saveSignatureImages.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            error: null,
            signatureImage: action.payload,
          };
        },
      )
      .addCase(
        saveSignatureImages.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            signatureImage: null,
          };
        },
      );

    //create
    builder
      .addCase(getProductsWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          SignatureID: null,
        };
      })
      .addCase(
        getProductsWorkload.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            error: null,
            SignatureID: action.payload.id,
          };
        },
      )
      .addCase(
        getProductsWorkload.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            SignatureID: null,
          };
        },
      );
  },
});

export default signatureSlice.reducer;
export const signatureSelector = (state: RootState) => state.signatures;
export const {} = signatureSlice.actions;
