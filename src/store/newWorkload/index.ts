import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { newWorkload, createNewWorkloads } from './newWorklod';
import { newWorkloadState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): newWorkloadState => {
  return {
    status: 'idle',
    error: null,
    isLoading: false,
    newWorkloadyData: null,
    createWorkloadyData: null,
  };
};

const newWorkloadSlice = createSlice({
  name: 'newWorkload',
  initialState: createDefaultState() as newWorkloadState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(newWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          newWorkloadyData: null,
        };
      })
      .addCase(newWorkload.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          error: null,
          newWorkloadyData: action.payload,
        };
      })
      .addCase(newWorkload.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          newWorkloadyData: null,
        };
      })
      // createNewWorkload

      .addCase(createNewWorkloads.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          createWorkloadyData: null,
        };
      })
      .addCase(
        createNewWorkloads.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            error: null,
            createWorkloadyData: action.payload,
          };
        },
      )
      .addCase(
        createNewWorkloads.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            isLoading: false,
            status: 'failed',
            error: action.payload as string,
            createWorkloadyData: null,
          };
        },
      );
  },
});

export default newWorkloadSlice.reducer;
export const newWorkloadSelector = (state: RootState) => state.newWorkload;
export const {} = newWorkloadSlice.actions;
