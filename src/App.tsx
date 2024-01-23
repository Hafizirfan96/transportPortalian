import { LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '@/store';
import { ApplicationNavigator } from '@/navigators';
//import './Translations'
import SplashScreen from 'react-native-splash-screen';
import { NativeBaseProvider } from 'native-base';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

// Create a client
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NativeBaseProvider>
            <ApplicationNavigator />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
