import { createSlice } from '@reduxjs/toolkit';
import { CreateSignatureState, CreateReducers } from './create';
import { SaveSignatureState, SaveReducers } from './save';

const signatureSlice = createSlice({
  name: 'signature',
  initialState: {
    ...CreateSignatureState,
    ...SaveSignatureState,
    signatureImage: null,
  },
  reducers: {
    ...CreateReducers,
    ...SaveReducers,
    signatureImagestored: (state, action) => {
      state.signatureImage = action.payload;
    },
  },
});
export const {
  createSignature,
  createdSuccess,
  CreatedFailed,
  saveSignature,
  savedSuccess,
  savedFailed,
  signatureImagestored,
} = signatureSlice.actions;

export default signatureSlice.reducer;
