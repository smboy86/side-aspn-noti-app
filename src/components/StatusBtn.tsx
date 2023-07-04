import useAuthStore from '@store/AuthStore';
import { Box, Text, View } from 'native-base';
import { Animated } from 'react-native';

type props = {
  type: 'A' | 'B' | string;
};

export default function StatusBtn(props: props) {
  return (
    <>
      {props.type === 'A' ? (
        <Box background={'#FFA5A5'} px={2} py={0.5} rounded={4}>
          <Text color={'#FF2727'}>승인전</Text>
        </Box>
      ) : (
        <Box background={'#BBFF85'} px={2} py={0.5} rounded={4}>
          <Text color={'#0EB200'}>진행중</Text>
        </Box>
      )}
    </>
  );
}
