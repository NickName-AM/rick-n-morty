import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import type { Episode } from '../types/api';

export interface EpisodeRowProps {
  episode: Pick<Episode, 'episode' | 'name' | 'air_date'>;
}

// API episode codes end with E + digits (e.g. S01E01); season prefix is ignored.
function extractEpisodeNumber(episodeCode: string): string {
  const match = episodeCode.match(/E(\d+)$/);
  if (!match) return '00';
  return match[1].padStart(2, '0');
}

export function EpisodeRow({ episode }: EpisodeRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{extractEpisodeNumber(episode.episode)}</Text>
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.name} numberOfLines={1}>
          {episode.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {episode.episode} · {episode.air_date}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  codeBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: colors.textPrimary,
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
  },
  meta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
