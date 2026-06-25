// Reused by both Home and Search stacks. Phase 7 will switch props to dual-stack-compatible typing.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';
import { useCharacterDetail } from '../hooks/useCharacterDetail';

type Props = NativeStackScreenProps<HomeStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen({ route }: Props) {
  const { character, episodes, isLoading, isError } = useCharacterDetail(
    route.params.characterId,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character</Text>
      <Text style={styles.body}>Character ID: {route.params.characterId}</Text>
      <Text style={styles.subtitle}>Phase 7 — coming soon</Text>

      {/* TODO: Remove this data test block in Phase 7 when the real detail screen is built */}
      {isLoading && <Text style={styles.info}>Loading character…</Text>}
      {isError && <Text style={styles.info}>Error loading character</Text>}
      <Text style={styles.info}>Name: {character?.name ?? '—'}</Text>
      <Text style={styles.infoSecondary}>Episodes: {episodes.length}</Text>
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
  info: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  infoSecondary: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
