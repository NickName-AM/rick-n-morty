import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { colors } from '../theme/colors';
import type { Character } from '../types/api';
import { StatusBadge } from './StatusBadge';

export type CharacterCardVariant = 'hero' | 'compact' | 'list-row';

export interface CharacterCardProps {
  character: Pick<Character, 'name' | 'image' | 'status' | 'species' | 'gender'>;
  variant: CharacterCardVariant;
  onPress?: () => void;
  showFeaturedLabel?: boolean;
  subtitle?: string;
}

export function CharacterCard({
  character,
  variant,
  onPress,
  showFeaturedLabel = false,
  subtitle,
}: CharacterCardProps) {
  const defaultSubtitle = `${character.species} · ${character.gender}`;
  const displaySubtitle = subtitle ?? defaultSubtitle;

  const content =
    variant === 'hero' ? (
      <HeroContent
        character={character}
        showFeaturedLabel={showFeaturedLabel}
        subtitle={displaySubtitle}
      />
    ) : variant === 'compact' ? (
      <CompactContent character={character} />
    ) : (
      <ListRowContent character={character} subtitle={displaySubtitle} />
    );

  const containerStyle =
    variant === 'hero'
      ? styles.heroContainer
      : variant === 'compact'
        ? styles.compactContainer
        : styles.listRowContainer;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
}

function HeroContent({
  character,
  showFeaturedLabel,
  subtitle,
}: {
  character: CharacterCardProps['character'];
  showFeaturedLabel: boolean;
  subtitle: string;
}) {
  return (
    <>
      <View style={styles.heroCircleLarge} />
      <View style={styles.heroCircleSmall} />
      {showFeaturedLabel && (
        <View style={styles.featuredLabel}>
          <Text style={styles.featuredLabelText}>FEATURED</Text>
        </View>
      )}
      <Text style={styles.heroName} numberOfLines={1} ellipsizeMode="tail">
        {character.name}
      </Text>
      <Text style={styles.heroSubtitle} numberOfLines={1} ellipsizeMode="tail">
        {subtitle}
      </Text>
      <View style={styles.heroBadge}>
        <StatusBadge status={character.status} />
      </View>
    </>
  );
}

function CompactContent({ character }: { character: CharacterCardProps['character'] }) {
  return (
    <>
      <Image
        source={{ uri: character.image }}
        style={styles.compactAvatar}
        contentFit="cover"
        placeholderContentFit="cover"
        transition={300}
      />
      <Text style={styles.compactName} numberOfLines={1} ellipsizeMode="tail">
        {character.name}
      </Text>
      <Text style={styles.compactSubtitle} numberOfLines={1} ellipsizeMode="tail">
        {character.species}
      </Text>
    </>
  );
}

function ListRowContent({
  character,
  subtitle,
}: {
  character: CharacterCardProps['character'];
  subtitle: string;
}) {
  return (
    <>
      <Image
        source={{ uri: character.image }}
        style={styles.listRowAvatar}
        contentFit="cover"
        placeholderContentFit="cover"
        transition={300}
      />
      <View style={styles.listRowTextColumn}>
        <Text style={styles.listRowName} numberOfLines={1} ellipsizeMode="tail">
          {character.name}
        </Text>
        <Text style={styles.listRowSubtitle} numberOfLines={1} ellipsizeMode="tail">
          {subtitle}
        </Text>
      </View>
      <StatusBadge status={character.status} />
    </>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  heroContainer: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    minHeight: 210,
    overflow: 'hidden',
  },
  heroCircleLarge: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    top: -60,
    right: -40,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    bottom: -30,
    left: -20,
  },
  featuredLabel: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  featuredLabelText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: colors.accent,
  },
  heroName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: colors.textPrimary,
    marginTop: 14,
  },
  heroSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },
  heroBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  compactContainer: {
    width: 108,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  compactAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  compactName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 10,
    textAlign: 'center',
  },
  compactSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
    textAlign: 'center',
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listRowAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  listRowTextColumn: {
    flex: 1,
    minWidth: 0,
  },
  listRowName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: colors.textPrimary,
  },
  listRowSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 3,
  },
});
