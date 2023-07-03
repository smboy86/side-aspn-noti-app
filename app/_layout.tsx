import { Stack } from 'expo-router';
import { AuthProvider } from '../context/authProvider';
import { Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <AuthProvider children>
        <Stack>
          <Stack.Screen
            name='(auth)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='(tabs)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='other'
            options={{
              title: '',
              headerShown: true,
              headerTransparent: Platform.OS === 'ios',
              headerBlurEffect: 'regular',
            }}
          />
        </Stack>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
