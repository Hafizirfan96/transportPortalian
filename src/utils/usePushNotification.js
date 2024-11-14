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
      //Request iOS permission
      await messaging().requestPermission();
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      let pushToken = fcmToken;
      // console.log('token-----', pushToken);
      // await Storage.setString('pushtoken', pushToken);
    } else {
      console.log('Failed', 'No token received');
      Alert('No token received');
    }
  };

  const listenToForegroundNotifications = async handleNotification => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('listenToForegroundNotifications----', remoteMessage);
      await handleNotification(remoteMessage);

      await notifee.requestPermission({
        sound: true,
        badge: true,
        alert: true,
      });

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'SkolemeldingChannel',
        name: 'Skolemelding Channel',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        smallIcon: 'ic_launcher_round',
        sound: 'default',
        vibration: true,
      });
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
        ios: {
          badgeCount: remoteMessage?.notification?.ios?.badge,
          sound: 'default',
        },
        android: {
          channelId: channelId,
          sound: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
    });
    return unsubscribe;
  };

  const listenToForegroundNotifeeNotifications =
    async handleNotificationFromTray => {
      var unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            await handleNotificationFromTray(detail.notification);
            break;
        }
      });

      return unsubscribe;
    };

  const listenToBackgroundNotifications = async handleNotification => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );

        await handleNotification(remoteMessage);
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromBackground =
    async handleNotificationFromTray => {
      const unsubscribe = messaging().onNotificationOpenedApp(
        async remoteMessage => {
          // console.log(
          //   'App opened from BACKGROUND by tapping notification:',
          //   JSON.stringify(remoteMessage),
          // )
          await handleNotificationFromTray(remoteMessage);
        },
      );
      return unsubscribe;
    };

  const onNotificationOpenedAppFromQuit = async handleNotification => {
    const message = await messaging().getInitialNotification();
    if (message) {
      await handleNotification(message);
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
    listenToForegroundNotifeeNotifications,
  };
};

export default usePushNotification;
