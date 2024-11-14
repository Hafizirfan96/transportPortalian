import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import usePushNotification from './utils/usePushNotification';
import { AppState, View, BackHandler, Keyboard } from 'react-native';
import { navigate, navigationRef } from './navigators/Root';
import { setnotificationMessage } from '@/store/appState';
import moment from 'moment';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';

export default function AppInitializer(props: any) {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state.appState);

  const [notificationState, setNotificationState] = useState({
    readyForClearBadge: false,
    appNativeState: 'background',
  });

  const [isAppActive, setIsAppActive] = useState(false);

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
  const [pendingNotification, setPendingNotification] = useState(null);

  useEffect(() => {
    const appStateSubscriber = AppState.addEventListener(
      'change',
      onAppStateChange,
    );
    return () => appStateSubscriber.remove();
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
    getFCMToken();
  }, []);

  const _handleNotification = async (notification: any) => {
    try {
      let data = notification.notification;
      dispatch(setnotificationMessage(data));
    } catch (ex) {
      console.debug(ex);
    }
  };

  const _handleNotificationFromTray = async (notification: any) => {
    try {
      if (!notification) {
        return;
      }
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
          console.log(
            'Notification pressed in background:',
            detail.notification,
          );
          // Handle navigation or any other logic you want to trigger
          navigate('Notification', detail.notification);
        }
      });
      console.log('notification----', notification);
      navigate('Notification', notification);
    } catch (ex) {
      console.debug(ex);
    }
  };

  const onAppStateChange = async (nextAppState: any) => {
    try {
      if (nextAppState === 'active') {
        console.log('active----');
      }
      if (nextAppState === 'background') {
        console.log('background----');
      } else if (
        nextAppState === 'active' &&
        notificationState.appNativeState === 'background'
      ) {
        console.log('else if----');
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
              console.log('setOpeningModal----');

              return;
            }
            appForeground();
          }
        }

        if (nextAppState == 'background') {
          console.log('set inactive----');
        }
        console.log('set native----');
      }
    } catch (ex) {
      console.debug(ex);
    }
  };

  const appForeground = async () => {
    const isAppTimeout = _isAppTimeout();
    if (isAppTimeout) {
      setTimeout(() => {
        console.log('setTime----');
      }, 1000);
    }
  };
  const _isAppTimeout = () => {
    if (appState.Authorized) {
      let { inactiveTime } = appState;
      if (inactiveTime) {
        let now = moment();
        let lastInactiveTime = moment(new Date(inactiveTime));
        let durationPassed = moment.duration(now.diff(lastInactiveTime));
        if (durationPassed.asMinutes() >= 10) {
          return true;
        }
      }
    }

    return false;
  };
  return <View />;
}
