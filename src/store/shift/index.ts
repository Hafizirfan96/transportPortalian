import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ShiftStartModel, ShiftState } from '@/interfaces';
import { endShift, myStartedShifts, startShift } from './shiftThunk';
import { RootState } from '..';

const createDefaultState = (): ShiftState => {
  return {
    status: 'idle',
    error: null,
    shiftStart: null,
    shiftEnd: false,
    isLoading: false,
    myStartShiftData: null,
  };
};

const shiftSlice = createSlice({
  name: 'shift',
  initialState: { ...createDefaultState() },
  reducers: {
    setShiftInfo: (state, action) => {
      state.myStartShiftData = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(startShift.pending, (state: ShiftState) => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          shiftStart: null,
        };
      })
      .addCase(
        startShift.fulfilled,
        (state: ShiftState, action: PayloadAction<ShiftStartModel>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            myStartShiftData: action.payload,
            shiftStart: action.payload,
          };
        },
      )
      .addCase(
        startShift.rejected,
        (state: ShiftState, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload,
            shiftStart: null,
            isLoading: false,
          };
        },
      )

      .addCase(endShift.pending, (state: ShiftState) => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          shiftEnd: false,
        };
      })
      .addCase(
        endShift.fulfilled,
        (state: ShiftState, action: PayloadAction<boolean>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            shiftStart: null,
            myStartShiftData: null,
          };
        },
      )
      .addCase(
        endShift.rejected,
        (state: ShiftState, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload,
            isLoading: false,
          };
        },
      )

      //
      .addCase(myStartedShifts.pending, (state: ShiftState) => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          // isLoading: true,
          myStartShiftData: null,
        };
      })
      .addCase(
        myStartedShifts.fulfilled,
        (state: ShiftState, action: PayloadAction<ShiftStartModel>) => {
          return {
            ...state,
            status: 'succeeded',
            // isLoading: false,
            myStartShiftData: action.payload,
          };
        },
      )
      .addCase(
        myStartedShifts.rejected,
        (state: ShiftState, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload,
            // myStartShiftData: null,
            // isLoading: false,
          };
        },
      );
  },
});

export const { setShiftInfo } = shiftSlice.actions;
export const shiftSelector = (state: RootState) => state.shift;
export default shiftSlice.reducer;
