import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { tourInfo, startTour, endTour } from './tourInfo';
import { TourState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): TourState => {
  return {
    status: 'idle',
    error: null,
    tourData: [],
    activeToursIds: [],
    info: null,
    isLoading: false,
    currentTourItem: null,
    isUpdating: false,
    tourId: null,
    tourEnd: false,
    isError: false,
    TourValid: false,
  };
};

const tourInfoSlice = createSlice({
  name: 'tour',
  initialState: createDefaultState() as TourState,
  reducers: {
    isTourValid: (state, action) => {
      state.TourValid = action.payload;
    },
    UpdateTour: (state, action) => {
      const { IsTourActive, id, guid } = action.payload;
      let ids = [...current(state).activeToursIds];
      const { currentTourItem } = current(state);
      let index = state.tourData?.findIndex(
        (item: any) =>
          item.CustomerId == currentTourItem?.CustomerId &&
          item.ProjectId == currentTourItem?.ProjectId,
      );
      if (IsTourActive) {
        ids = [...ids, guid];
        current(state).activeToursIds = ids;
      } else {
        ids = ids.filter(item => item !== id);
        current(state).activeToursIds = ids;
      }
      if (index >= 0) {
        current(state.tourData)[index].IsTourActive = IsTourActive;
        current(state.tourData)[index].TourId = id;
        current(state.tourData)[index].TourGuid = guid;
        current(state).isUpdating = false;
        current(state).isLoading = false;
      }
    },
    setCurrentTour: (state, action) => {
      current(state).currentTourItem = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(tourInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          // tourData: null,
          isError: false,
        };
      })
      .addCase(tourInfo.fulfilled, (state, action: PayloadAction<any>) => {
        let ids: any[] = [];
        action.payload.map((item: any) => {
          if (item.IsTourActive) {
            ids.push(item.TourGuid);
          }
        });
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          tourData: action.payload,
          activeToursIds: ids,
          isError: false,
        };
      })
      .addCase(tourInfo.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
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
          isUpdating: true,
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
          isUpdating: false,
        };
      })
      .addCase(startTour.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          tourId: null,
          isError: true,
          isUpdating: false,
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
export const { isTourValid, UpdateTour, setCurrentTour } =
  tourInfoSlice.actions;
