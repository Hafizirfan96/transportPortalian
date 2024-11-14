import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import usePushNotification from './utils/usePushNotification';
import { AppState, View, BackHandler, Keyboard } from 'react-native';

export default function AppInilizer(props: any) {
  let appState = useSelector((state: any) => {
    return state.appState;
  });

  const [notificationState, setNotificationState] = useState({
    readyForClearBadge: false,
    appNativeState: 'background',
  });

  useEffect(() => {
    const backAction = () => {
      Keyboard.dismiss();
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const appStateSubscriber = AppState.addEventListener(
      'change',
      onAppStateChange,
    );
    return () => {
      appStateSubscriber.remove();
    };
  }, [appState]);

  const {
    getFCMToken,
    requestUserPermission,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
    listenToForegroundNotifeeNotifications,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = async () => {
      try {
        requestUserPermission();

        await listenToBackgroundNotifications(_handleNotification);
        await listenToForegroundNotifications(_handleNotification);
        getFCMToken();
      } catch (error) {
        console.log('forground error', error);
      }
    };
    listenToNotifications();
  }, []);

  useEffect(() => {
    const listenToNotifications = async () => {
      try {
        await listenToForegroundNotifeeNotifications(
          _handleNotificationFromTray,
        );
        await onNotificationOpenedAppFromQuit(_handleNotificationFromTray);
        await onNotificationOpenedAppFromBackground(
          _handleNotificationFromTray,
        );
      } catch (error) {
        console.log('background error', error);
      }
    };
    listenToNotifications();
  }, []);
  const _handleNotification = async (notification: any) => {
    try {
      console.log('try----', notification);
    } catch (ex) {
      console.debug(ex);
    }
  };
  const _handleNotificationFromTray = async (notification: any) => {
    try {
      console.log('try--', notification);

      if (!notification) {
        return;
      }
      console.log('try--', notification);
    } catch (ex) {
      console.debug(ex);
    }
  };

  const onAppStateChange = async (nextAppState: any) => {
    try {
      if (nextAppState === 'active') {
        // themeChangeListener()
        console.log('active----');
      }
      if (nextAppState === 'background') {
        // document why this block is empty
        console.log('background----');
      } else if (
        nextAppState === 'active' &&
        notificationState.appNativeState === 'background'
      ) {
        console.log('else----');
      }
      if (!appState) {
        return;
      }

      if (appState.Authorized) {
        if (
          appState.NativeAppState.match(/inactive/) ||
          appState.NativeAppState.match(/background/)
        ) {
          if (nextAppState === 'active') {
            if (appState.openingModal) {
              console.log('active----');
              return;
            }
            appForeground();
          }
        }

        if (nextAppState == 'background') {
          console.log('background----');
        }
        console.log('background----');
      }
    } catch (ex) {
      console.debug(ex);
    }
  };
  const appForeground = async () => {
    console.log('appForeground');
  };

  return <View />;
}
