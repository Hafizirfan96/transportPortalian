import { createSlice } from '@reduxjs/toolkit';
import { SaveFilesState, SaveReducers } from './save';

const localFilesSlice = createSlice({
  name: 'filesSave',
  initialState: {
    ...SaveFilesState,
    savingFilesDataImage: {},
  },
  reducers: {
    ...SaveReducers,
    localFilesStored: (state, action) => {
      state.savingFilesDataImage = action.payload;
    },
  },
});
export const { saveFiles, savedSuccess, savedFailed, localFilesStored } =
  localFilesSlice.actions;

export default localFilesSlice.reducer;
