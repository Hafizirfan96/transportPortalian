import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    toastMessage: null,
    registerDamage: {
      description: '',
      files: [],
    },
  },
  reducers: {
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    setDamageFiles: (state, action) => {
      state.registerDamage.files = action.payload;
    },
    setDamageDesc: (state, action) => {
      state.registerDamage.description = action.payload;
    },
  },
});

export const { showToast, setDamageFiles, setDamageDesc } = appSlice.actions;

export default appSlice.reducer;
