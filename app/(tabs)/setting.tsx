import { View } from 'react-native';
import { useAuth } from '../../context/authProvider';
import { Button, HStack, Text } from 'native-base';

export default function Setting() {
  const { setUser, user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HStack>
        <Text>아이디 : </Text>
        <Text>{user?.id}</Text>
      </HStack>
      <HStack>
        <Text>이름 : </Text>
        <Text>{user?.name}</Text>
      </HStack>
      <Button onPress={() => setUser(null)} mt={10}>
        <Text bold color={'#fff'} px={8}>
          Log out
        </Text>
      </Button>
    </View>
  );
}
