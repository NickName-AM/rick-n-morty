import React from 'react';
import { ScrollView, View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  CharacterCard,
  FilterTabs,
  SkeletonCard,
  ErrorCard,
  SearchBarPressable,
} from '../components';
import { useCharacters } from '../hooks/useCharacters';
import { useAppStore } from '../store';
import { colors } from '../theme/colors';
import type { HomeStackParamList, RootTabParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

function goToSearchList(navigation: HomeScreenNavigationProp) {
  navigation
    .getParent<BottomTabNavigationProp<RootTabParamList>>()
    ?.navigate('Search', { screen: 'CharacterList' });
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { data, isLoading, isError, refetch } = useCharacters();
  const status = useAppStore((s) => s.status);
  const setStatus = useAppStore((s) => s.setStatus);
  const resetFilters = useAppStore((s) => s.resetFilters);

  const characters = data?.pages.flatMap((p) => p.results) ?? [];
  const hero = characters[0];
  const popular = characters.slice(1, 11);

  if (isError) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ErrorCard
          onRetry={() => refetch()}
          onGoHome={() => { resetFilters(); refetch(); }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBarPressable onPress={() => goToSearchList(navigation)} />

        <View style={styles.filterRow}>
          <FilterTabs value={status} onChange={setStatus} />
        </View>

        {isLoading && !hero ? (
          <>
            <View style={styles.heroSection}>
              <SkeletonCard variant="hero" />
            </View>
            <View style={styles.popularSection}>
              <Text style={styles.popularHeader}>Popular</Text>
              <View style={styles.popularRow}>
                {[0, 1, 2, 3].map((i) => (
                  <SkeletonCard key={i} variant="compact" />
                ))}
              </View>
            </View>
          </>
        ) : !isLoading && !isError && characters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyHeading}>No characters found</Text>
            <Text style={styles.emptyBody}>
              Try a different status filter or browse all characters.
            </Text>
            <Pressable
              onPress={() => goToSearchList(navigation)}
              style={({ pressed }) => [styles.emptyCta, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.emptyCtaLabel}>Browse all characters</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {hero && (
              <View style={styles.heroSection}>
                <CharacterCard
                  variant="hero"
                  character={hero}
                  showFeaturedLabel
                  subtitle={`${hero.species} · ${hero.location.name}`}
                  onPress={() =>
                    navigation.navigate('CharacterDetail', { characterId: hero.id })
                  }
                />
              </View>
            )}

            {popular.length > 0 && (
              <View style={styles.popularSection}>
                <Text style={styles.popularHeader}>Popular</Text>
                <FlatList
                  horizontal
                  data={popular}
                  keyExtractor={(item) => String(item.id)}
                  scrollEnabled
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.popularList}
                  renderItem={({ item }) => (
                    <CharacterCard
                      variant="compact"
                      character={item}
                      onPress={() =>
                        navigation.navigate('CharacterDetail', { characterId: item.id })
                      }
                    />
                  )}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  filterRow: {
    marginTop: 16,
  },
  heroSection: {
    marginTop: 24,
  },
  popularSection: {
    marginTop: 24,
  },
  popularRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  popularHeader: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  popularList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
    marginTop: 24,
  },
  emptyHeading: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
  emptyCta: {
    marginTop: 24,
    minHeight: 44,
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCtaLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: colors.background,
  },
});
