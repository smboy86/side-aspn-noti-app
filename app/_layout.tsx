import { SplashScreen, Stack, Slot } from "expo-router";

import {
  useFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";
import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "@auth/authProvider";

export default function RootLayout() {
  // useRouterNotifications();
  // pre-load
  // 1) font
  const [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  // if (!fontsLoaded) {
  //   // 추가적으로 store / navigation 로딩 처리도 여기서 해야되는 거 아닌가
  //   return <SplashScreen />;
  // }

  return (
    <>
      <NativeBaseProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            {/* _layout 이 없을땐 이걸 정의하지 않아야 오류가 안 생기나..? */}
            {/* <Stack.Screen
              name='(details)'
              options={{
                headerShown: false,
                // headerBackTitle: ' >> ', // 적용안됨
                // headerTintColor: '#000',
                // headerBackVisible: true,
              }}
            /> */}
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </AuthProvider>
      </NativeBaseProvider>
    </>
  );
}
