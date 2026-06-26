import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

export interface SearchBarPressableProps {
  onPress: () => void;
  placeholder?: string;
}

export function SearchBarPressable({
  onPress,
  placeholder = 'Search characters...',
}: SearchBarPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Search characters"
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
});
