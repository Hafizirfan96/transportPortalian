import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';

const usePushNotification = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Token retrieved successfully:', fcmToken);
    } else {
      console.log('Failed to retrieve FCM token');
      Alert.alert('No token received');
    }
  };

  const listenToForegroundNotifications = async handleNotification => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      await handleNotification(remoteMessage);

      await notifee.requestPermission({
        sound: true,
        badge: true,
        alert: true,
      });

      const channelId = await notifee.createChannel({
        id: 'transportportalenChannel',
        name: 'Transportportalen Channel',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'default',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          sound: 'default',
          pressAction: { id: 'default' },
        },
      });

      await handleNotification(remoteMessage.notification);
    });

    return unsubscribe;
  };

  const listenToForegroundNotifeeNotifications =
    async handleNotificationFromTray => {
      const unsubscribe = notifee.onForegroundEvent(
        async ({ type, detail }) => {
          if (type === EventType.PRESS) {
            console.log('Notification pressed:', detail.notification);
            await handleNotificationFromTray(detail.notification);
          } else if (type === EventType.DISMISSED) {
            console.log('Notification dismissed:', detail.notification);
          }
        },
      );
      return unsubscribe;
    };

  const listenToBackgroundNotifications = async handleNotification => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'Background notification received:',
        remoteMessage.notification,
      );

      // Display notification using notifee
      const channelId = await notifee.createChannel({
        id: 'transportportalenChannel',
        name: 'Transportportalen Channel',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'default',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          sound: 'default',
          pressAction: { id: 'default' },
        },
      });

      await handleNotification(remoteMessage.notification);
    });
  };

  const onNotificationOpenedAppFromBackground =
    async handleNotificationFromTray => {
      const unsubscribe = messaging().onNotificationOpenedApp(
        async remoteMessage => {
          console.log(
            'App opened from background via notification:',
            remoteMessage,
          );
          await handleNotificationFromTray(remoteMessage);
        },
      );
      return unsubscribe;
    };

  const onNotificationOpenedAppFromQuit = async handleNotification => {
    const initialMessage = await messaging().getInitialNotification();
    if (initialMessage) {
      console.log(
        'App opened from quit state via notification:',
        initialMessage,
      );
      await handleNotification(initialMessage);
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToForegroundNotifeeNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
