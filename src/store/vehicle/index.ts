import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getMyVehicles,
  startVehicle,
  endVehicle,
  pickupLorry,
} from './vehicleInfo';
import { VehicleState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): VehicleState => {
  return {
    status: 'idle',
    error: '',
    selectedVehicleId: '',
    vehicleData: null,
    isLoading: false,
    vehicleStartData: null,
    isError: false,
    isUpdating: false,
  };
};

const vehicleInfoSlice = createSlice({
  name: 'vehicle',
  initialState: createDefaultState() as VehicleState,
  reducers: {
    setVehicleData: (state, action) => {
      let index = state.vehicleData.Items.findIndex(
        (item: any) => item.VehicleId == action.payload.VehicleId,
      );
      state.vehicleData.Items[index].TourVehicleId = action.payload.id;
      state.vehicleData.Items[index].IsVehicleActive =
        action.payload.IsVehicleActive;
      state.vehicleData.Items[index].LastKm = action.payload.km;
      state.vehicleData.Items[index].LastPosition = action.payload.position;
      state.isUpdating = false;
    },
    setVehicleId: (state, action)=> {
      state.selectedVehicleId = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMyVehicles.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          vehicleData: null,
          isError: false,
        };
      })
      .addCase(getMyVehicles.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          vehicleData: action.payload,
          isError: false,
        };
      })
      .addCase(getMyVehicles.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          vehicleData: null,
          isError: true,
        };
      })
      // start vehicle
      .addCase(startVehicle.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isUpdating: true,
          vehicleStartData: null,
          isError: false,
        };
      })
      .addCase(startVehicle.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isError: false,
        };
      })
      .addCase(startVehicle.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isUpdating: false,
          isError: true,
        };
      });
    // end vehicle
    builder.addCase(endVehicle.pending, state => {
      return {
        ...state,
        loading: 'pending',
        error: null,
        isUpdating: true,
        isError: false,
      };
    });
    builder.addCase(
      endVehicle.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isError: false,
          isUpdating: false,
        };
      },
    );
    builder
      .addCase(endVehicle.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isUpdating: false,
          isError: true,
        };
      })
      //pickupLorry

      .addCase(pickupLorry.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          isError: false,
        };
      })
      .addCase(pickupLorry.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          vehicleData: action.payload,
          isLoading: false,
          isError: false,
          isUpdating: false,
        };
      })
      .addCase(pickupLorry.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          vehicleData: null,
          isLoading: false,
          isError: true,
          isUpdating: false,
        };
      });
  },
});

export default vehicleInfoSlice.reducer;
export const vehicleSelector = (state: RootState) => state.vehicle;
export const getSelectedVehicleId = (state: RootState) => state.vehicle.selectedVehicleId;
export const { setVehicleData, setVehicleId } = vehicleInfoSlice.actions;
