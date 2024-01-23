import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logOutAndReset } from './logOutAndReset';
import { logOutStateModel } from '@/interfaces';
import { RootState } from '..';
const createDefaultState = (): logOutStateModel => {
  return {
    status: 'idle',
    error: false,
    isActive: false,
  };
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState: createDefaultState() as logOutStateModel,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logOutAndReset.pending, state => {
        return {
          ...state,
          loading: 'pending',
          isActive: false,
        };
      })
      .addCase(
        logOutAndReset.fulfilled,
        (state, action: PayloadAction<any>) => {
          return {
            ...state,
            status: 'succeeded',
            isActive: action.payload,
          };
        },
      )
      .addCase(logOutAndReset.rejected, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          status: 'failed',
          isActive: false,
        };
      });
  },
});

export default logoutSlice.reducer;
export const logoutSelector = (state: RootState) => state.logOut;
export const {} = logoutSlice.actions;
