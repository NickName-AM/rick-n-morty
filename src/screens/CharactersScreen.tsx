import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  CharacterCard,
  FilterTabs,
  SkeletonCard,
  ErrorCard,
} from '../components';
import { useCharacters } from '../hooks/useCharacters';
import { useAppStore } from '../store';
import { colors } from '../theme/colors';
import type { SearchStackParamList } from '../navigation/types';
import type { Character } from '../types/api';

export default function CharactersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();

  const { data, isLoading, isError, refetch } = useCharacters();
  const status = useAppStore((s) => s.status);
  const setStatus = useAppStore((s) => s.setStatus);
  const resetFilters = useAppStore((s) => s.resetFilters);

  const characters = data?.pages.flatMap((p) => p.results) ?? [];
  const totalCount = data?.pages[0]?.info.count ?? 0;

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard
      variant="list-row"
      character={item}
      onPress={() =>
        navigation.navigate('CharacterDetail', { characterId: item.id })
      }
    />
  );

  if (isError) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ErrorCard
          onRetry={() => refetch()}
          onGoHome={() => {
            resetFilters();
            refetch();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={isLoading ? [] : characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <FilterTabs value={status} onChange={setStatus} />
            {!isLoading && (
              <Text style={styles.count}>{totalCount} characters</Text>
            )}
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <React.Fragment key={i}>
                  {i > 0 && <View style={styles.separator} />}
                  <SkeletonCard variant="list-row" />
                </React.Fragment>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No characters found</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    gap: 12,
    paddingTop: 8,
    paddingBottom: 16,
  },
  count: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
  },
});
