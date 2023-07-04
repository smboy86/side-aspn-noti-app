import { useEffect, ReactNode } from 'react';
import { useSegments, useRouter, useRootNavigationState } from 'expo-router';
import useAuthStore from '@store/AuthStore';

// TODO - 자동로그인 관련
export function AuthProvider({ children }: any) {
  const { session } = useAuthStore((state) => state);

  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    // console.log('222 :: ', !navigationState?.key);
    if (!navigationState?.key) return;
    // console.log('3333 :: ', !navigationState?.key);

    const inAuthGroup = segments[0] === '(auth)'; // (auth) 외엔 모두 session 필요함
    // console.log('4444 :: ', !session, !inAuthGroup);
    // console.log('4444 ----2 :: ', session, inAuthGroup);
    // console.log('4444 ----3 :: ', !session && !inAuthGroup);
    // console.log('4444 ----4 :: ', session && inAuthGroup);

    if (!session && !inAuthGroup) {
      // 보안 처리가 필요한 루트인데 session 이 없으면
      // 로그인 페이지로 이동
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // 자동 로그인 처리
      router.replace('/'); // 여기서 / 는 app/index.js 에 선언되어있는 Redirect다 (home == (tabs)/approval-before)
    }
  }, [session, segments]);

  return <>{children}</>;
}
