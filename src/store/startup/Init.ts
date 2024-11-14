import TokenStorage from '@/services/TokenStorageService';
import StorageService from '@/services/StorageService';

import { navigateAndSimpleReset } from '@/navigators/Root';
import {
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper';
import { setShiftInfo } from '../Shift';
import { Config } from '@/Config/index';

export default {
  initialState: {
    loading: false,
    isAuthenticated: false,
  },
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    var isAuth = await TokenStorage.isAuthenticated();
    if (isAuth) {
      var shiftInfo = await StorageService.get(Config.KEYS.SHIFT_INFO);
      if (shiftInfo != null) {
        dispatch(setShiftInfo(shiftInfo));
      }
      navigateAndSimpleReset('Main');
    } else {
      navigateAndSimpleReset('Login');
    }
  }),
  reducers: {
    ...buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
    pending: (state, action) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    },
    fulfilled: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    },
    rejected: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
  },
};
