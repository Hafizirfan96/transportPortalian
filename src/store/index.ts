import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import appState from './appState';
import location from './location';
import log from './log';
import externalLink from './externalLink';

const reducers = combineReducers({
  startup,
  auth,
  appState,
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
  location,
  log,
  externalLink,
  //[api.reducerPath]: api.reducer,
});

export const storage = AsyncStorage;
export const reduxStorage: Storage = {
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: async key => {
    const value = await AsyncStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: async key => {
    await AsyncStorage.removeItem(key);
    return Promise.resolve();
  },
  clearAll: async () => {
    // storage.clearAll();
    const keys = await AsyncStorage.getAllKeys();
    keys.map(async item => {
      if (item !== 'password' && item !== 'rememberMe' && item !== 'email') {
        await AsyncStorage.removeItem(item);
      }
    });
  },
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    'theme',
    'auth',
    'dashboard',
    'location',
    'vehicleService',
    'tour',
    'vehicle',
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      ignoredActions: ['your/action/type'],
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      ignoredPaths: ['items.dates'],
    });
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
