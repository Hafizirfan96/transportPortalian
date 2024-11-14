import { Config } from '@/Config';
// import { StorageService } from '@/Services/StorageService'
// import { PushNotificationService } from '@/Services/PushNotificationService'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const getPushNotificationPermission = async () => {
  try {
    const permission = await messaging().hasPermission();
    return permission == messaging.AuthorizationStatus.AUTHORIZED;
  } catch (error) {
    return false; //throw "notification permission rejected"
  }
};

export const getPushNotificationToken = async () => {
  try {
    var token = await messaging().getToken();
    return token;
    //let token = await ss.getString('pushtoken')
    //return token
  } catch (error) {
    return null; //throw "notification permission rejected"
  }
};

export const removeAllNotification = async () => {
  try {
    await notifee.cancelAllNotifications();
    await notifee.setBadgeCount(0);
    return true;
  } catch (error) {
    return false; //throw "notification permission rejected"
  }
};

export const getPushNotificationStatus = async () => {
  // const storagePushStatus = await ss.getItem(Config.KEYS.PUSH_NOTIFICATION)
  // let pushNotificationEnabled = storagePushStatus || { enabled: true }
  // let systemPushNotificationEnabled = await getPushNotificationPermission()
  // return pushNotificationEnabled.enabled && systemPushNotificationEnabled
};

export const apnsToFcm = async (apns: any) => {
  // const appId =
  //   Config.AUTH_SOURCE === Config.AUTHENTICATION.NORWAY_CITIZEN_PORT
  //     ? 'com.cgi.oslomelding.foresatte'
  //     : 'com.cgi.oslomelding'
  let model = {
    application: 'appId',
    // sandbox: Config.'IOS_SANBOX', // it will be false for Distribution mode.
    apns_tokens: [apns],
  };
  let jsonBody = JSON.stringify(model);
  let response = await fetch('https://iid.googleapis.com/iid/v1:batchImport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAb8XWB38:APA91bEQFvCnjFd4zpZUxGQL7M_FbhPTLT3seQT_yWIdMNICszyH4G_hnl_q6aRt_mhtfZjni3YZpKaJGIitZDs1xoxHcSz_uN6UPnFnTLTyYBe75Ar-lGcDNvVrxLAUofMKu2-p5xDc',
    },
    body: jsonBody,
  });
  return response.json();
};

export const updatePushNotificationState = async (
  pushNotificationEnabledStatus: boolean,
) => {
  let token = await getPushNotificationToken();
  if (token) {
    if (!pushNotificationEnabledStatus) {
      // await ss.setItem(Config.KEYS.PUSH_NOTIFICATION, {
      //   enabled: false,
      // })
      // return await PushNotificationService.unregisterPushNotification(token)
    }

    // if (pushNotificationEnabledStatus) {
    //   await ss.setItem(Config.KEYS.PUSH_NOTIFICATION, {
    //     enabled: true,
    //   })
    //   return await PushNotificationService.registerPushNotification(token)
    // }
  }

  // await ss.setItem(Config.KEYS.PUSH_NOTIFICATION, {
  //   enabled: false,
  // })
  return false;
};
