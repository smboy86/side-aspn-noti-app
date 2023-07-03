import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text } from 'react-native';

export default () => {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{
        tabBarStyle: Platform.OS === 'ios' && {
          backgroundColor: 'transparent',
        },
        headerShown: false,
      }}
      tabBar={(props) =>
        Platform.OS === 'ios' ? (
          <BlurView
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            intensity={95}>
            <BottomTabBar {...props} />
          </BlurView>
        ) : (
          <BottomTabBar {...props} />
        )
      }>
      <Tabs.Screen
        name='approval-before'
        options={{
          href: '/approval-before',
          title: '',
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 17,
                backgroundColor: 'transparent',
              }}>
              <TabBarIcon name='file-text-o' color={color} size={24} />
              <Text style={{ marginTop: 12, fontSize: 10, opacity: 0.5 }}>
                결재 전
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='approval-after'
        options={{
          title: '',
          headerShown: false,
          href: {
            pathname: '/approval-after',
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 17,
                backgroundColor: 'transparent',
              }}>
              <TabBarIcon name='file-text-o' color={color} size={24} />
              <Text style={{ marginTop: 12, fontSize: 10, opacity: 0.5 }}>
                결재 완료
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          title: '',
          headerShown: false,
          href: {
            pathname: '/setting',
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 17,
                backgroundColor: 'transparent',
              }}>
              <TabBarIcon name='user' color={color} size={24} />
              <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                설정
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return (
    <FontAwesome
      size={props.size || 26}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}
