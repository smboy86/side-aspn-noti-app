import { Stack, useLocalSearchParams } from 'expo-router';
import { Box, Text } from 'native-base';

export default function DetailApproval() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: `ID : ${id} 상세화면`,
          headerBackTitle: ' ',
          headerTintColor: '#000',
        }}
      />
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <Text>{id}</Text>
      </Box>
    </>
  );
}
