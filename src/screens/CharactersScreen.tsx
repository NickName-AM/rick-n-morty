import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import type { SearchStackParamList } from '../navigation/types';

export default function CharactersScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <Text style={styles.subtitle}>Character list — coming soon</Text>
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
});
