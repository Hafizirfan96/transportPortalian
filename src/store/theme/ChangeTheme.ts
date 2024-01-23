import { createAction } from '@reduxjs/toolkit';
import { ThemeState } from '@/store/theme/index';

interface PayloadInterface {
  payload: Partial<ThemeState>;
}

export default {
  initialState: {},
  action: createAction<Partial<ThemeState>>('theme/changeTheme'),
  reducers(state: ThemeState, { payload }: PayloadInterface) {
    if (typeof payload.theme !== 'undefined') {
      state.theme = payload.theme;
    }
    if (typeof payload.darkMode !== 'undefined') {
      state.darkMode = payload.darkMode;
    }
    if (typeof payload.modus !== 'undefined') {
      state.modus = payload.modus;
    }
  },
};
