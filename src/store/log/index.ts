import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {} from './logInfo';
import { VehicleState } from '@/interfaces';
import { RootState } from '..';
import { logInfo } from './logInfo';

const createDefaultState = (): VehicleState => {
  return {
    status: 'idle',
    error: '',
    vehicleData: null,
    isLoading: false,
    vehicleStartData: null,
    isError: false,
    isUpdating: false,
  };
};

const logInfoSlice = createSlice({
  name: 'vehicle',
  initialState: createDefaultState() as VehicleState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleData: null,
          isError: false,
        };
      })
      .addCase(logInfo.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vehicleData: action.payload,
          isError: false,
        };
      })
      .addCase(logInfo.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          vehicleData: null,
          isError: true,
        };
      });
  },
});

export default logInfoSlice.reducer;
export const vehicleSelector = (state: RootState) => state.log;
