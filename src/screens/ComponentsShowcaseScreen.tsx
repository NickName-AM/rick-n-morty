import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import {
  StatusBadge,
  FilterTabs,
  CharacterCard,
  SkeletonCard,
  EpisodeRow,
  ErrorCard,
} from '../components';
import { colors } from '../theme/colors';
import type { Character, Episode } from '../types/api';
import type { FilterStatus } from '../types/app';

const MOCK_CHARACTER: Pick<Character, 'name' | 'image' | 'status' | 'species' | 'gender'> = {
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
};

const MOCK_EPISODE: Pick<Episode, 'episode' | 'name' | 'air_date'> = {
  episode: 'S01E01',
  name: 'Pilot',
  air_date: 'December 2, 2013',
};

export default function ComponentsShowcaseScreen() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>StatusBadge</Text>
        <View style={styles.badgeRow}>
          <StatusBadge status="Alive" />
          <StatusBadge status="Dead" />
          <StatusBadge status="unknown" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FilterTabs</Text>
        <FilterTabs value={filter} onChange={setFilter} />
        <Text style={styles.filterValue}>Current filter: {filter}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CharacterCard — hero</Text>
        <CharacterCard
          variant="hero"
          character={MOCK_CHARACTER}
          showFeaturedLabel
          onPress={() => {}}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CharacterCard — compact</Text>
        <View style={styles.compactRow}>
          <CharacterCard variant="compact" character={MOCK_CHARACTER} onPress={() => {}} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CharacterCard — list-row</Text>
        <CharacterCard variant="list-row" character={MOCK_CHARACTER} onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SkeletonCard — list-row</Text>
        <SkeletonCard />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SkeletonCard — compact</Text>
        <View style={styles.compactRow}>
          <SkeletonCard variant="compact" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SkeletonCard — hero</Text>
        <SkeletonCard variant="hero" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EpisodeRow</Text>
        <EpisodeRow episode={MOCK_EPISODE} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ErrorCard</Text>
        <View style={styles.errorCardContainer}>
          <ErrorCard
            onRetry={() => console.log('retry')}
            onGoHome={() => console.log('go home')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ErrorCard — custom message</Text>
        <View style={styles.errorCardContainer}>
          <ErrorCard
            message="Failed to load character details."
            onRetry={() => console.log('retry')}
            onGoHome={() => console.log('go home')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 48,
  },
  section: {},
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterValue: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
  compactRow: {
    flexDirection: 'row',
    gap: 12,
  },
  errorCardContainer: {
    minHeight: 400,
  },
});
