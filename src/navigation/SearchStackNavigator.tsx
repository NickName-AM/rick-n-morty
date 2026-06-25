import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { SearchStackParamList } from './types';
import CharactersScreen from '../screens/CharactersScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontFamily: 'Inter_600SemiBold' },
      }}
    >
      <Stack.Screen
        name="CharacterList"
        component={CharactersScreen}
        options={{ title: 'Characters' }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Character' }}
      />
    </Stack.Navigator>
  );
}
