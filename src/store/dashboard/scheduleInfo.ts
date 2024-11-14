import { DashboardInfoModel } from '@/interfaces';
import { dashboardService } from '@/services/Dashboard';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const dashboardScheduleInfo:any = createAsyncThunk(
  'dashboard/scheduleInfo',
  async (args, thunkAPI) => {
    try {
      const response = await dashboardService.fetchUserSchedule();

      return response as DashboardInfoModel;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
