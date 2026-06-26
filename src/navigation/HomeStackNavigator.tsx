import React from 'react';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import type { HomeStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import ComponentsShowcaseScreen from '../screens/ComponentsShowcaseScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Rick & Morty',
          headerRight: __DEV__
            ? () => (
                <Pressable
                  onPress={() => navigation.navigate('ComponentsShowcase')}
                  accessibilityLabel="Component showcase"
                  style={({ pressed }) => [{ paddingHorizontal: 16, opacity: pressed ? 0.7 : 1 }]}
                >
                  <Ionicons name="flask-outline" size={22} color={colors.textPrimary} />
                </Pressable>
              )
            : undefined,
        })}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Character' }}
      />
      {__DEV__ && (
        <Stack.Screen
          name="ComponentsShowcase"
          component={ComponentsShowcaseScreen}
          options={{ title: 'Components' }}
        />
      )}
    </Stack.Navigator>
  );
}
