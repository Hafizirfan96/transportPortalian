import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getMyLorries, startLorri, endLorri, pickupLorry } from './lorryInfo';
import { lorryState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): lorryState => {
  return {
    status: 'idle',
    error: null,
    lorryData: null,
    isLoading: false,
    isUpdatingLorry: false,
    vehicleStartData: null,
    isError: false,
    selectedIndex: -1,
  };
};

const lorriInfoSlice = createSlice({
  name: 'lorries',
  initialState: createDefaultState() as lorryState,
  reducers: {
    UpdateLorryState: (state, action) => {
      const index = state.lorryData.Items.findIndex(
        (item: any) => item.VehicleId === action.payload.VehicleId,
      );
      state.lorryData.Items[index].IsVehicleActive =
        action.payload.IsVehicleActive;
      state.lorryData.Items[index].TourVehicleId = action.payload.TourVehicleId;
      state.isUpdatingLorry = false;
      state.selectedIndex = -1;
    },
    setselectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMyLorries.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          lorryData: null,
          isError: false,
        };
      })
      .addCase(getMyLorries.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          lorryData: action.payload,
          // isError: false,
        };
      })
      .addCase(getMyLorries.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          lorryData: null,
          // isError: true,
        };
      })
      // start vehicle
      // .addCase(startLorri.pending, state => {
      //   return {
      //     ...state,
      //     loading: 'pending',
      //     error: null,
      //     isUpdatingLorry: true,
      //     isError: false,
      //   };
      // })
      // .addCase(startLorri.fulfilled, (state, action: PayloadAction<any>) => {
      //   return {
      //     ...state,
      //     status: 'succeeded',
      //     isUpdatingLorry: false,
      //     isError: false,
      //   };
      // })
      // .addCase(startLorri.rejected, (state, action: PayloadAction<any>) => {
      //   return {
      //     ...state,
      //     status: 'failed',
      //     error: action.payload as string,
      //     isLoading: false,
      //     isUpdatingLorry: false,
      //     isError: true,
      //   };
      // })
      // end vehicle
      .addCase(endLorri.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isUpdatingLorry: true,
          isError: false,
        };
      })
      .addCase(endLorri.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isUpdatingLorry: false,
          isError: false,
        };
      })
      .addCase(endLorri.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isUpdatingLorry: false,
          isError: true,
        };
      })
      //pickupLorry

      .addCase(pickupLorry.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isUpdatingLorry: true,
          isError: false,
        };
      })
      .addCase(pickupLorry.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isUpdatingLorry: false,
          error: null,
          isError: false,
        };
      })
      .addCase(pickupLorry.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isUpdatingLorry: false,
          isError: true,
        };
      });
  },
});

export default lorriInfoSlice.reducer;
export const lorriSelector = (state: RootState) => state.lorry;
export const { UpdateLorryState, setselectedIndex } = lorriInfoSlice.actions;
