import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInspection, createInspection } from './vehicleInspection';
import { vehicleInspectionQuestion } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): vehicleInspectionQuestion => {
  return {
    status: 'idle',
    error: null,
    vehicleInsecctionData: null,
    isLoading: false,
    vehicleCreateData: null,
  };
};

const vehicleInsPectionSlice = createSlice({
  name: 'vehicleInspection',
  initialState: createDefaultState() as vehicleInspectionQuestion,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getInspection.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleInsecctionData: null,
        };
      })
      .addCase(getInspection.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vehicleInsecctionData: action.payload,
        };
      })
      .addCase(getInspection.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          vehicleInsecctionData: null,
        };
      })

      // create inspection
      .addCase(createInspection.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleCreateData: null,
        };
      })
      .addCase(
        createInspection.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            vehicleCreateData: action.payload,
          };
        },
      )
      .addCase(
        createInspection.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            vehicleInsecctionData: null,
            isLoading: false,
            vehicleCreateData: null,
          };
        },
      );
  },
});

export default vehicleInsPectionSlice.reducer;
export const vehicleInspectionSelector = (state: RootState) =>
  state.vehicleInspection;
export const {} = vehicleInsPectionSlice.actions;
