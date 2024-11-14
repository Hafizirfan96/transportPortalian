import { RootState } from '..';
import { ExternalStateModal } from '@/interfaces';
import { externalLinkInfo } from './externalLinkInfo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const createDefaultState = (): ExternalStateModal => {
  return {
    status: 'idle',
    error: '',
    externalLinkData: null,
    isLoading: false,
    isError: false,
    isUpdating: false,
  };
};

const externalLinkInfoSlice = createSlice({
  name: 'externalLink',
  initialState: createDefaultState() as ExternalStateModal,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(externalLinkInfo.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          externalLinkData: null,
          isError: false,
        };
      })
      .addCase(
        externalLinkInfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            externalLinkData: action.payload,
            isError: false,
          };
        },
      )
      .addCase(
        externalLinkInfo.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            isLoading: false,
            externalLinkData: null,
            isError: true,
          };
        },
      );
  },
});

export default externalLinkInfoSlice.reducer;
export const externalLinkSelector = (state: RootState) => state.externalLink;
