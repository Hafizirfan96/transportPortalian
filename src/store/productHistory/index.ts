import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getProductHistory } from './productHistoryInfo';
import { productHistoryState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): productHistoryState => {
  return {
    status: 'idle',
    error: null,
    isLoading: false,
    poductHistoryData: null,
  };
};

const productHistorySlice = createSlice({
  name: 'productHistory',
  initialState: createDefaultState() as productHistoryState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductHistory.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          poductHistoryData: null,
        };
      })
      .addCase(
        getProductHistory.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isLoading: false,
            error: null,
            poductHistoryData: action.payload,
          };
        },
      )
      .addCase(
        getProductHistory.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            poductHistoryData: null,
          };
        },
      );
  },
});

export default productHistorySlice.reducer;
export const productHistorySelector = (state: RootState) =>
  state.productHistory;
export const {} = productHistorySlice.actions;
