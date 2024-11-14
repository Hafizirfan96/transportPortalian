import { VehicleSearchModel } from '@/interfaces';
import {
  VehicleEndModel,
  VehicleLorryModel,
} from '@/interfaces/requestModels/vehicleRequestModel';
import { vehicleService } from '@/services/Vehicle';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateLorryState } from '.';
import { showToast } from '../appState';
const searchQuery: VehicleLorryModel = {
  CurrentPage: 1,
  PageSize: 20,
  SortOrder: 'ASC',
  SortBy: 'Name',
  SearchTerm: '',
  IsLorry: true,
};
export const getMyLorries = createAsyncThunk(
  'lorri/vehicleInfo',
  async (args: VehicleSearchModel, thunkAPI) => {
    try {
      const response = await vehicleService.getMyVehicles(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const startLorri = createAsyncThunk(
  'lorri/start',
  async (args, thunkAPI) => {
    try {
      const response = await vehicleService.startVehicle(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);

export const endLorri = createAsyncThunk(
  'lorri/end',
  async (args: VehicleEndModel, thunkAPI) => {
    try {
      const response = await vehicleService.endVehicle({
        TourVehicleId: args.TourVehicleId,
        EndKm: args.EndKm,
        EndPosition: args.EndPosition,
      });
      thunkAPI.dispatch(
        UpdateLorryState({
          ...args,
          IsVehicleActive: false,
          TourVehicleId: 0,
        }),
      );
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: errorMessage,
          }),
        );
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);

export const pickupLorry = createAsyncThunk(
  'tour/tourInfo',
  async (args: any, thunkAPI) => {
    try {
      const response = await vehicleService.pickupLorry(args);
      thunkAPI.dispatch(
        UpdateLorryState({
          ...args,
          IsVehicleActive: true,
          TourVehicleId: response,
        }),
      );
      return response;
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        const errorMessage = error.response.data.message;
        thunkAPI.dispatch(
          showToast({
            type: 'error',
            text1: 'Error Message',
            text2: errorMessage,
          }),
        );
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
