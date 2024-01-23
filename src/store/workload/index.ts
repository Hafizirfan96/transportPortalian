import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  myWorkloads,
  startWorkload,
  endWorkload,
  deleteWorkload,
} from './workloadApi';
import { WorkloadState } from '@/interfaces';
import { RootState } from '..';

const createDefaultState = (): WorkloadState => {
  return {
    status: 'idle',
    error: null,
    workloadData: null,
    isLoading: false,
    selectedItems: [],
    hasSelectedItems: false,
    workLoadList: [],
  };
};

const workloadSlice = createSlice({
  name: 'workload',
  initialState: createDefaultState() as WorkloadState,
  reducers: {
    workloadSelected: (state, action) => {
      state.selectedItems = action.payload;
      state.hasSelectedItems = action.payload.length > 0;
    },
    workLoadListData: (state, action) => {
      state.workLoadList = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(myWorkloads.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          workloadData: null,
        };
      })
      .addCase(myWorkloads.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          workloadData: action.payload,
        };
      })
      .addCase(myWorkloads.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
          workloadData: null,
        };
      })
      // start workload
      .addCase(startWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
        };
      })
      .addCase(startWorkload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          workloadData: action.payload,
        };
      })
      .addCase(startWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          workloadData: null,
          isLoading: false,
        };
      })
      // end workload
      .addCase(endWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
        };
      })
      .addCase(endWorkload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          workloadData: action.payload,
          isLoading: false,
        };
      })
      .addCase(endWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          workloadData: null,
          isLoading: false,
        };
      })
      //delete workload
      .addCase(deleteWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
        };
      })
      .addCase(
        deleteWorkload.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            // workloadData: action.payload,
          };
        },
      )
      .addCase(deleteWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          workloadData: null,
          isLoading: false,
        };
      });
  },
});

export default workloadSlice.reducer;
export const workloadSelector = (state: RootState) => state.workload;
export const { workloadSelected, workLoadListData } = workloadSlice.actions;
