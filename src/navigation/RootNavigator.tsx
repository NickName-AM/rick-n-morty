import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import type { RootTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Activate native screen optimization before any navigator renders.
enableScreens();

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
            title: 'Saved',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
