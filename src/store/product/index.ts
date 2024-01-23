import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  productLists,
  getProductsWorkload,
  getAllProductss,
} from './productInfo';
import { productState } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): productState => {
  return {
    status: 'idle',
    error: null,
    productData: null,
    isLoading: false,
    productListsData: null,
    allProduct: null,
  };
};

const productSlice = createSlice({
  name: 'product',
  initialState: createDefaultState() as productState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(productLists.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: true,
          productData: null,
        };
      })
      .addCase(productLists.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          error: null,
          productData: action.payload,
        };
      })
      .addCase(productLists.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          error: action.payload as string,
          productData: null,
        };
      })

      // getProductsWorkload
      .addCase(getProductsWorkload.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: false,
          productListsData: null,
        };
      })
      .addCase(
        getProductsWorkload.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            productListsData: action.payload,
          };
        },
      )
      .addCase(
        getProductsWorkload.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            productListsData: null,
          };
        },
      )
      .addCase(getAllProductss.pending, state => {
        return {
          ...state,
          loading: 'pending',
          error: null,
          isLoading: false,
          allProduct: null,
        };
      })
      .addCase(
        getAllProductss.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            allProduct: action.payload,
          };
        },
      )
      .addCase(
        getAllProductss.rejected,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'failed',
            error: action.payload as string,
            allProduct: null,
          };
        },
      );
  },
});

export default productSlice.reducer;
export const productSelector = (state: RootState) => state.product;
export const {} = productSlice.actions;
