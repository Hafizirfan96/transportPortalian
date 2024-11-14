import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';
import { store, persistor } from '@/store';
import ToastMessage from './components/Toast';
import { ApplicationNavigator } from '@/navigators';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { initErrorHandling } from '@/utils/ErrorHandler';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppInilizer from './AppInitlizer';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    initErrorHandling();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ToastMessage />
          <ApplicationNavigator />
          <AppInilizer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
