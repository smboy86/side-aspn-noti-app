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
import { useState } from 'react';

export default function Login() {
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
    </VStack>
  );
}
