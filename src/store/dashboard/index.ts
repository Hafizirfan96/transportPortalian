import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dashboardScheduleInfo } from './scheduleInfo';
import { DashboardState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): DashboardState => {
  return {
    status: 'idle',
    error: null,
    scheduleInfo: null,
  };
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: createDefaultState() as DashboardState,
  reducers: {
    clearUserinfo: () => createDefaultState(),
  },
  extraReducers: builder => {
    builder
      .addCase(dashboardScheduleInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
        };
      })
      .addCase(
        dashboardScheduleInfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            scheduleInfo: action.payload,
          };
        },
      )
      .addCase(
        dashboardScheduleInfo.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            scheduleInfo: null,
          };
        },
      );
  },
});

export default dashboardSlice.reducer;
export const dashboardSelector = (state: RootState) => state.dashboard;
export const { clearUserinfo } = dashboardSlice.actions;
