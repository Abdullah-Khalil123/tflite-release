import BackSVG from '@/assets/Settings/back';
import HomeSVG from '@/assets/Tabs/Home';
import SelectedHomeSVG from '@/assets/Tabs/SelectedHome';
import SelectedSettingsSVG from '@/assets/Tabs/SelectedSettings';
import SettingsSVG from '@/assets/Tabs/Settings';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, Tabs, useSegments } from 'expo-router';
import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface TabsIconProps {
  SelectedIcon: FC<SvgProps>;
  NotSelectedIcon: FC<SvgProps>;
  color: string;
  focused: boolean;
}
const TabsIcon = ({
  SelectedIcon,
  NotSelectedIcon,
  color,
  focused,
}: TabsIconProps) => {
  return <View>{focused ? <SelectedIcon /> : <NotSelectedIcon />}</View>;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const showBackButton = segments.some(
    (segment) => segment === 'change-password' || segment === 'change-email'
  );

  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          // backgroundColor: "#F46A62",
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: 'black',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          backgroundColor: 'white',
          borderColor: '#F2F2F2',
          borderWidth: 1,
          borderBottomWidth: 0,
        },
        // tabBarItemStyle: {
        //   backgroundColor: "red",
        // },
        tabBarIconStyle: {
          height: '100%',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              color={color}
              focused={focused}
              SelectedIcon={SelectedHomeSVG}
              NotSelectedIcon={HomeSVG}
            />
          ),

          // Header styles
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            lineHeight: 30,
            fontWeight: '500',
            color: '#FFF',
            fontFamily: 'Poppins_500Medium',
          },
          headerStyle: {
            backgroundColor: '#F46A62',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              color={color}
              focused={focused}
              SelectedIcon={SelectedSettingsSVG}
              NotSelectedIcon={SettingsSVG}
            />
          ),

          // Header styles
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            lineHeight: 30,
            fontWeight: '500',
            color: '#FFF',
            fontFamily: 'Poppins_500Medium',
          },
          headerStyle: {
            backgroundColor: '#F46A62',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: showBackButton
            ? () => (
                <Pressable
                  hitSlop={16}
                  onPress={() => router.back()}
                  className="ml-6"
                >
                  <BackSVG />
                </Pressable>
              )
            : undefined,
        }}
      />
    </Tabs>
  );
}
