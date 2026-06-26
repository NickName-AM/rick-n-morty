import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { StatusBadge, EpisodeRow, ErrorCard } from '../components';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { colors } from '../theme/colors';
import type { HomeStackParamList, RootTabParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'CharacterDetail'>;

function formatCreatedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function handleGoHome(navigation: Props['navigation']) {
  navigation
    .getParent<BottomTabNavigationProp<RootTabParamList>>()
    ?.navigate('Home', { screen: 'Home' });
}

export default function CharacterDetailScreen({ route, navigation }: Props) {
  const { character, episodes, isLoading, isError, refetch } = useCharacterDetail(
    route.params.characterId,
  );

  React.useEffect(() => {
    if (character) {
      navigation.setOptions({ title: character.name });
    }
  }, [character, navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (isError || !character) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ErrorCard
          onRetry={() => refetch()}
          onGoHome={() => handleGoHome(navigation)}
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
        <Image
          source={{ uri: character.image }}
          style={styles.avatar}
          contentFit="cover"
          placeholderContentFit="cover"
          transition={300}
        />
        <View style={styles.headerRow}>
          <Text style={styles.name}>{character.name}</Text>
          <StatusBadge status={character.status} />
        </View>

        <View style={styles.metaSection}>
          <MetaRow label="Species" value={character.species} />
          <MetaRow label="Gender" value={character.gender} />
          <MetaRow label="Origin" value={character.origin.name} />
          <MetaRow label="Location" value={character.location.name} />
          <MetaRow label="Created" value={formatCreatedDate(character.created)} />
          {character.type !== '' && (
            <MetaRow label="Type" value={character.type} />
          )}
        </View>

        <View style={styles.episodesHeader}>
          <Text style={styles.sectionTitle}>Episodes</Text>
          <Text style={styles.episodeCount}>{String(episodes.length)}</Text>
        </View>
        <View style={styles.episodeList}>
          {episodes.map((ep) => (
            <EpisodeRow key={ep.id} episode={ep} />
          ))}
        </View>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: 280,
    borderRadius: 18,
    backgroundColor: colors.card,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  metaSection: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: 16,
  },
  metaLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    flexShrink: 1,
    textAlign: 'right',
  },
  episodesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  episodeCount: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  episodeList: {
    gap: 12,
  },
});
