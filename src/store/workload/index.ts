import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  myWorkloads,
  startWorkload,
  endWorkload,
  deleteWorkload,
} from './workloadApi';
import { WorkloadState } from '@/interfaces';
import { RootState } from '..';
import { Config } from '@/config';
import {
  WorkloadFilter,
  WorkloadResult,
} from '@/interfaces/stateModels/workloadStateModel';
import _ from 'lodash';
import {
  checkAndPerformSearch,
  createDefaultState,
  doSearch,
  handleSelectedItems,
  updateWorkloadStatus,
} from '@/utils/workload';

const workloadSlice = createSlice({
  name: 'workload',
  initialState: createDefaultState,
  reducers: {
    workloadSelected: (state, action) => {
      if (action.payload.Id >= 0) {
        if (!state.selectedItemsIndexs.includes(action.payload.Id)) {
          state.selectedItemsIndexs = [
            ...state.selectedItemsIndexs,
            action.payload.Id,
          ];
        } else {
          state.selectedItemsIndexs = state.selectedItemsIndexs.filter(
            (items: any) => items !== action.payload.Id,
          );
        }
        state.hasSelectedItems = state.selectedItemsIndexs.length > 0;
        const startedItems = state.selectedItemsIndexs.filter((x: any) => {
          const index = state.workloadData.findIndex(
            (item: any) => item.Id === x,
          );
          if (state.workloadData[index].Status === Config.WORKLOAD_STATUS.NEW) {
            return state.workloadData[index].Id;
          }
        });
        state.hasNewItems = startedItems.length > 0;
      }
    },
    workLoadListData: (state, action) => {
      // let workLoad = action.payload.map((item: any) => ({
      //   ...item,
      //   isSelected: false,
      // }));
      state.workloadData = action.payload;
      state.selectedItemsIndexs = [];
    },
    workLoadStatusChange: (state, action) => {
      const { endWorkload, WorkloadEndStatus } = action.payload;
      updateWorkloadStatus(
        state.workloadData,
        state.defaultWorlLoadData,
        endWorkload,
        state.selectedItemsIndexs,
        WorkloadEndStatus,
      );

      handleSelectedItems(
        state.selectedItemsIndexs,
        state.workloadData,
        state.filter,
      );

      checkAndPerformSearch(
        state,
        state.workloadData,
        state.defaultWorlLoadData,
      );
      state.selectedItemsIndexs = [];
    },
    setSortFilter: (state, action) => {
      const { Id, SortBy, SortOrder } = action.payload;
      state.filter.Sort = Id;
      state.workloadData = _.orderBy(state.workloadData, [SortBy], SortOrder);
    },
    setTypeFilter: (state, action) => {
      state.filter = action.payload;
      doSearch(state, state.defaultWorlLoadData);
    },
    resetFilter: state => {
      state.filter = createDefaultState.filter;
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
          selectedItems: [],
          selectedItemsIndexs: [],
          filter: createDefaultState.filter,
          defaultWorlLoadData: [],
        };
      })
      .addCase(myWorkloads.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          workloadData: action.payload,
          defaultWorlLoadData: action.payload,
          isLoading: false,
        };
      })
      .addCase(myWorkloads.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
        };
      })
      // start workload
      .addCase(startWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          // isLoading: true,
        };
      })
      .addCase(startWorkload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
        };
      })
      .addCase(startWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
        };
      })
      // end workload
      .addCase(endWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          // isLoading: true,
        };
      })
      .addCase(endWorkload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
        };
      })
      .addCase(endWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          isLoading: false,
        };
      })
      //delete workload
      .addCase(deleteWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          // isLoading: true,
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
          isLoading: false,
        };
      });
  },
});

export default workloadSlice.reducer;
export const workloadSelector = (state: RootState) => state.workload;
export const {
  workloadSelected,
  workLoadListData,
  workLoadStatusChange,
  setTypeFilter,
  setSortFilter,
  resetFilter,
} = workloadSlice.actions;
