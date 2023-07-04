import { Redirect } from 'expo-router';
import { useEffect, useRef } from 'react';
import { LogBox, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import useAuthStore from '@store/AuthStore';

//// DEV - LOGS
const IGNORED_LOGS = [
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.', // native-base
];

LogBox.ignoreLogs(IGNORED_LOGS);

// Workaround for Expo 45
if (__DEV__) {
  const withoutIgnored =
    (logger: any) =>
    (...args: any) => {
      const output = args.join(' ');

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}

//////////
// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('my-key');
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

// 외부에서 받은 노티를 내부에서 다시 임의로 띄워 준다.
async function localNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      // data: { data: noti.request.content.data },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    // TODO - store token in server
    console.log('expo Push token ::   ' + token);
    // sample
    // ExponentPushToken[qkADdjIUAXDttW2XOYt33u]
    // {"actionIdentifier": "expo.modules.notifications.actions.DEFAULT", "notification": {"date": 1688401958.3179932, "request": {"content": [Object], "identifier": "428a0f18-063f-442a-904e-096cde0f3a8e", "trigger": [Object]}}}
  } else {
    // 시뮬레이터 일 때
    console.log('시뮬레이터 기기입니다.');
    // alert('Must use physical device for Push Notifications');
  }

  return token;
}

// 그저 비동기로 호출만 하는 녀석으로 써먹어야 되나...
export default function IndexRoute() {
  /**
   * noti
   */
  const notificationListener = useRef();
  const responseListener = useRef();

  const { setToken } = useAuthStore((state) => state); // 전역 토큰 저장

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          'noti listener  :: ',
          notification.request.content.title,
          notification.request.content.body
        );

        localNotification(
          notification.request.content.title,
          notification.request.content.body
        );
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <Redirect href='/(tabs)/approval-before' />;
}
