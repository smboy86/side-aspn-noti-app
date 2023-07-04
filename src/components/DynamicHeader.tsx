import useAuthStore from '@store/AuthStore';
import { Text, View } from 'native-base';
import { Animated } from 'react-native';

export default function DynamicHeader({ value }: { value: any }) {
  const Header_Max_Height = 210;
  const Header_Min_Height = 96;
  const Scroll_Distance = Header_Max_Height - Header_Min_Height;

  const { session } = useAuthStore((state) => state);

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderAvatarOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedHeaderAvatarHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });

  const animatedHeaderFontColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#fff', '#000'],
    extrapolate: 'clamp',
  });

  const animatedHeaderBgColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#fff'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        paddingTop: 16,
        marginBottom: 4,
        height: animatedHeaderHeight,
        backgroundColor: animatedHeaderBgColor,
      }}>
      <Animated.View
        style={{
          width: 70,
          height: animatedHeaderAvatarHeight,
          backgroundColor: '#000',
          borderRadius: 35,
          marginBottom: 12,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: animatedHeaderAvatarOpacity,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#fff',
          }}>
          {session?.userInfo.name.substring(0, 1)}
        </Text>
      </Animated.View>
      <Animated.Text
        style={{
          color: animatedHeaderFontColor,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        사원 {session?.userInfo.name}
      </Animated.Text>
    </Animated.View>
  );
}
