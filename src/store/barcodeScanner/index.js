import { createSlice } from '@reduxjs/toolkit';

const barcodeScannerSlice = createSlice({
  name: 'barcodeScanner',
  initialState: {
    scaneKolliNumber: [],
  },
  reducers: {
    barcodeScanner: (state, action) => {
      state.scaneKolliNumber = action.payload;
    },
  },
});
export const { barcodeScanner } = barcodeScannerSlice.actions;

export default barcodeScannerSlice.reducer;
