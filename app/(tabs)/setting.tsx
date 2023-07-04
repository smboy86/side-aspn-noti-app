import { Pressable, View } from 'react-native';
import { Button, HStack, Text, Toast } from 'native-base';
import * as Clipboard from 'expo-clipboard';
import useAuthStore from '@store/AuthStore';

export default function Setting() {
  const { session, logout, token } = useAuthStore((state) => state);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HStack>
        <Text>Token : </Text>
        <Pressable
          onPress={async () => {
            await Clipboard.setStringAsync(token);
            Toast.show({ description: '토큰 복사 되었습니다.' });
          }}>
          <Text>{token}</Text>
        </Pressable>
      </HStack>
      <HStack>
        <Text>아이디 : </Text>
        <Text>{session?.userInfo.id}</Text>
      </HStack>
      <HStack>
        <Text>이름 : </Text>
        <Text>{session?.userInfo.name}</Text>
      </HStack>
      <Button onPress={() => logout()} mt={10}>
        <Text bold color={'#fff'} px={8}>
          Log out
        </Text>
      </Button>
    </View>
  );
}
