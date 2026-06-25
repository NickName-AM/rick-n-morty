import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCharacters } from '../hooks/useCharacters';
import { useAppStore } from '../store';
import { colors } from '../theme/colors';
import type { SearchStackParamList } from '../navigation/types';

export default function CharactersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();
  const { data, status: queryStatus, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacters();
  const setStatus = useAppStore((s) => s.setStatus);

  const characters = data?.pages.flatMap((p) => p.results) ?? [];
  const totalCount = data?.pages[0]?.info.count ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <Text style={styles.subtitle}>Character list — coming soon</Text>

      {/* TODO: Remove this data test block in Phase 6 when the real list screen is built */}
      <Text style={styles.info}>Query status: {queryStatus}</Text>
      <Text style={styles.info}>Total count: {totalCount}</Text>
      <Text style={styles.info}>First character: {characters[0]?.name ?? '—'}</Text>
      <Text style={styles.infoSecondary}>hasNextPage: {String(hasNextPage)}</Text>
      <Text style={styles.infoSecondary}>isFetchingNextPage: {String(isFetchingNextPage)}</Text>
      <Button
        title="Load next page"
        onPress={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
      />
      <Button title="Filter: Alive" onPress={() => setStatus('alive')} />

      {/* TODO: Remove in Phase 6 when real list-row navigation is wired */}
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
  info: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  infoSecondary: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
