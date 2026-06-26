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

import { StatusBadge } from '../components';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { colors } from '../theme/colors';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'CharacterDetail'>;

export default function CharacterDetailScreen({ route, navigation }: Props) {
  const { character, episodes, isLoading, isError, refetch } = useCharacterDetail(
    route.params.characterId,
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!character) {
    return null;
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
});
