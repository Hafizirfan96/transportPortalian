import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formValue: '',
};
const slice = createSlice({
  name: 'formValue',
  initialState,
  reducers: {
    setformValue: (state, action) => {
      state.formValue = action.payload;
    },
  },
});

export const { setformValue } = slice.actions;
export default slice.reducer;
