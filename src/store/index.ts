import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import theme from './theme';
import startup from './startup';
import dashboard from './dashboard';
import shift from './shift';
import workload from './workload';
import signature from './signature';
import barcodeScanner from './barcodeScanner';
import auth from './auth';
import tour from './tour';
import vehicle from './vehicle';
import product from './product';
import logOut from './logOut';
import lorry from './lorry';
import vehicleInspection from './vehicleInspection';
import forgot from './forgotPassword';
import fileUpoad from './fileUpload';
import productHistory from './productHistory';
import newWorkload from './newWorkload';
import vehicleService from './vehicleService';
import localFileUpload from './localFileUpload';
import signatures from './signatures';
import formVal from './newWorkload/formState';

const reducers = combineReducers({
  startup,
  auth,
  theme,
  dashboard,
  shift,
  tour,
  product,
  vehicle,
  lorry,
  vehicleInspection,
  vehicleService,
  signatures,
  workload,
  newWorkload,
  signature,
  localFileUpload,
  fileUpoad,
  barcodeScanner,
  logOut,
  forgot,
  productHistory,
  formVal,
  //[api.reducerPath]: api.reducer,
});

export const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
