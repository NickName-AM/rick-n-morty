import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick & Morty Explorer</Text>
      <Text style={styles.subtitle}>Home — coming soon</Text>
      {/* TODO: Remove in Phase 5 when real card navigation is wired */}
      <Button
        title="Test: Go to Detail"
        onPress={() => navigation.navigate('CharacterDetail', { characterId: 1 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
