import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Text } from 'native-base';

export default function DetailApproval() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: `ID : ${id} 상세화면`,
          headerShown: true,
          headerBackTitle: ' >> ', // 적용안됨
          headerTintColor: '#000',
          headerBackVisible: true,
        }}
      />
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text>{id}</Text>
      </Box>
    </>
  );
}
