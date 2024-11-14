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
    searchLoading: false,
  };
};

const productSlice = createSlice({
  name: 'product',
  initialState: createDefaultState() as productState,
  reducers: {
    resetProduct: (state, action) => {
      state = createDefaultState();
    },
  },
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
        const modifiedResponse = action.payload.map(group => ({
          ...group,
          Products: group.Products.map(product => ({
            ...product,
            data: {
              price: { value: '', error: false, isRequired: product.IsPrice },
              quantity: {
                value: '',
                error: false,
                isRequired: product.IsQuantity,
              },
              comment: {
                value: '',
                error: false,
                isRequired: product.IsComment,
              },
            },
          })),
        }));
        return {
          ...state,
          status: 'succeeded',
          isLoading: false,
          error: null,
          productData: modifiedResponse,
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
          searchLoading: true,
          // allProduct: null,
        };
      })
      .addCase(
        getAllProductss.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            searchLoading: false,
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
            // allProduct: null,
            searchLoading: false,
          };
        },
      );
  },
});

export default productSlice.reducer;
export const productSelector = (state: RootState) => state.product;
export const { resetProduct } = productSlice.actions;
