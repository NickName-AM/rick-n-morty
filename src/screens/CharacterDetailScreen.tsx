// Reused by both Home and Search stacks. Phase 7 will switch props to dual-stack-compatible typing.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character</Text>
      <Text style={styles.body}>Character ID: {route.params.characterId}</Text>
      <Text style={styles.subtitle}>Phase 7 — coming soon</Text>
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
  body: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
