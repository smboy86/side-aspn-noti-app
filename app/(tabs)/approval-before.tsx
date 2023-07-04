import DynamicHeader from '@components/DynamicHeader';
import StatusBtn from '@components/StatusBtn';
import { Box, HStack, ScrollView, VStack, Text } from 'native-base';
import { useRef } from 'react';
import { View, Animated } from 'react-native';

const DATA = [
  {
    id: 1,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 2,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'B',
  },
  {
    id: 3,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'B',
  },
  {
    id: 4,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 5,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 6,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 7,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 8,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
  {
    id: 9,
    site: 'ASPN',
    title: '버그 발생 수정 요청',
    description:
      '다음 버튼을 눌러도 진행이 되지 않는 문제가 있습니다. 수정 요청드립니다',
    status: 'A',
  },
];

export default function approvalBefore() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <DynamicHeader value={scrollOffsetY} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 190,
        }}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          }
        )}>
        {DATA.map((item) => {
          return (
            <View
              key={item.id.toString()}
              style={{
                height: 100,
                backgroundColor: '#92929215',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 8,
              }}>
              <HStack w={'full'} px={2} justifyContent={'space-between'}>
                <VStack w={'4/6'}>
                  <Text>{item.site}</Text>
                  <Text>{item.title}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail'>
                    {item.description}
                  </Text>
                </VStack>
                <VStack
                  w={'2/6'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-end'}
                  space={2}>
                  <Text
                    fontSize={'xs'}
                    textAlign={'right'}
                    color={'#929292'}
                    w={'full'}>
                    {'3일전 오후 10:10'}
                  </Text>
                  <StatusBtn type={item.status} />
                </VStack>
              </HStack>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
