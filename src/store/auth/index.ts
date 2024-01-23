import { createSlice } from '@reduxjs/toolkit';
import { login } from './login';
import { RootState } from '..';

export type LoginState = {
  loading: boolean;
  isError: boolean;
  userData: any;
  error: any;
};

const createDefaultState = (): LoginState => {
  return {
    loading: false,
    isError: false,
    userData: null,
    error: null,
  };
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    ...createDefaultState(),
  },
  reducers: {
    clearUserData: () => createDefaultState(),
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        return {
          ...state,
          loading: true,
          isError: false,
          error: null,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          isError: false,
          error: null,
          userData: action.payload,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          userData: null,
          isError: true,
          error: action?.payload,
        };
      });
  },
});

export const { clearUserData } = userDataSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default userDataSlice.reducer;
