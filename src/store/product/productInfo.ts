import { productService } from '@/services/product';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const productLists = createAsyncThunk(
  'produc/productList',
  async (args, thunkAPI) => {
    try {
      const response = await productService.getMyProducts(args);
      return response;
    } catch (error) {
      if (error?.response.data.errors && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);

export const getProductsWorkload = createAsyncThunk(
  'product/productWorkload',
  async (args, thunkAPI) => {
    try {
      const response = await productService.getProductsForWorkload(args);
      return response;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  },
);
export const getAllProductss = createAsyncThunk(
  'all/product',
  async (args, thunkAPI) => {
    try {
      const response = await productService.getAllProducts(args);
      return response;
    } catch (error) {
      if (error?.response.data.errors && error.response.status === 400) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        console.log('Error:', error);
        throw error;
      }
    }
  },
);
