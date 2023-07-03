import { useAuth } from '../../context/authProvider';
import {
  Box,
  Button,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from 'native-base';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Images from '../../constants/Images';
import { useEffect, useRef, useState } from 'react';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

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
    console.log(token);
    // sample
    // ExponentPushToken[qkADdjIUAXDttW2XOYt33u]
    // {"actionIdentifier": "expo.modules.notifications.actions.DEFAULT", "notification": {"date": 1688401958.3179932, "request": {"content": [Object], "identifier": "428a0f18-063f-442a-904e-096cde0f3a8e", "trigger": [Object]}}}
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function Login() {
  /**
   * noti
   */

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          '1111  :: ',
          notification.request.content.title,
          notification.request.content.body
        );
        setNotification(notification);
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

  /**
   * noti end
   */
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const toast = useToast();
  const { setUser } = useAuth();

  const login = () => {
    if (id?.length <= 0) {
      toast.show({
        render: () => {
          return (
            <Box bg='amber.200' px='4' py='2' rounded='lg' mb={5}>
              <Text color={'#000'}>이름을 입력해주세요</Text>
            </Box>
          );
        },
      });
      return;
    }

    if (pw?.length <= 0) {
      toast.show({
        render: () => {
          return (
            <Box bg='amber.200' px='4' py='2' rounded='lg' mb={5}>
              <Text color={'#000'}>패스워드를 입력해주세요</Text>
            </Box>
          );
        },
      });
      return;
    }

    setUser({
      id: id,
      pw: pw,
      name: id as string,
    });
  };

  const handleSetId = (text: string) => {
    setId(text);
  };
  const handleSetPw = (text: string) => {
    setPw(text);
  };

  return (
    <VStack
      w={'full'}
      flex={1}
      px={4}
      justifyContent={'center'}
      alignItems={'center'}
      bg={'white'}>
      <VStack space={2}>
        <Text>{JSON.stringify(notification)}</Text>
        <Box alignItems={'center'}>
          <Image
            source={Images.logoFull}
            w={312 * 0.45}
            h={112 * 0.45}
            mb={8}
            alt='logo img'
          />
        </Box>
        <Input
          value={id}
          onChangeText={handleSetId}
          w={{
            base: '85%',
          }}
          InputLeftElement={
            <Icon
              as={<Ionicons name='ios-person-outline' />}
              size={4}
              ml='2'
              color='muted.400'
            />
          }
          placeholder='아이디'
        />
        <Input
          value={pw}
          onChangeText={handleSetPw}
          w={{
            base: '85%',
          }}
          InputLeftElement={
            <Icon
              as={<Feather name='lock' />}
              size={4}
              ml='2'
              color='muted.400'
            />
          }
          placeholder='패스워드'
        />
      </VStack>

      <Box w={'full'} alignItems='center'>
        <Button
          onPress={() => login()}
          w={{
            base: '85%',
          }}
          mt={4}
          bg={'#2155A6'}
          fontWeight={'bold'}>
          로그인
        </Button>
      </Box>
      <Box w={'full'} alignItems='center'>
        <Button
          onPress={() => schedulePushNotification()}
          w={{
            base: '85%',
          }}
          mt={4}
          bg={'#2155A6'}
          fontWeight={'bold'}>
          푸시 확인
        </Button>
      </Box>
    </VStack>
  );
}
