import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { tourInfo, startTour, endTour } from './tourInfo';
import { TourState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): TourState => {
  return {
    status: 'idle',
    error: null,
    tourData: null,
    info: null,
    isLoading: false,
    tourId: null,
    tourEnd: false,
    isError: false,
  };
};

const tourInfoSlice = createSlice({
  name: 'tour',
  initialState: createDefaultState() as TourState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(tourInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          tourData: null,
          isError: false,
        };
      })
      .addCase(tourInfo.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          tourData: action.payload,
          isError: false,
        };
      })
      .addCase(tourInfo.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          tourData: null,
          isError: true,
          isLoading: false,
        };
      })

      // start tour
      .addCase(startTour.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          tourId: null,
          isError: false,
        };
      })
      .addCase(startTour.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          tourId: action.payload,
          isError: false,
          isLoading: false,
        };
      })
      .addCase(startTour.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          tourId: null,
          isError: true,
          isLoading: false,
        };
      })

      //end tour
      .addCase(endTour.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          tourEnd: false,
          isError: false,
        };
      })
      .addCase(endTour.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          tourEnd: action.payload,
          isError: false,
          isLoading: false,
        };
      })
      .addCase(endTour.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          tourEnd: false,
          isError: true,
          isLoading: false,
        };
      });
  },
});

export default tourInfoSlice.reducer;
export const tourSelector = (state: any) => state.tour;
export const {} = tourInfoSlice.actions;
