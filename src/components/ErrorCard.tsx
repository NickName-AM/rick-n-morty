import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

const DEFAULT_MESSAGE =
  "Couldn't load characters. Check your connection and try again.";

export interface ErrorCardProps {
  message?: string;
  onRetry: () => void;
  onGoHome: () => void;
}

export function ErrorCard({ message, onRetry, onGoHome }: ErrorCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle-outline" size={36} color={colors.statusDead} />
      </View>

      <Text style={styles.heading}>Oops!</Text>
      <Text style={styles.body}>{message ?? DEFAULT_MESSAGE}</Text>

      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}
      >
        <Text style={styles.primaryLabel}>Try Again</Text>
      </Pressable>

      <Pressable
        onPress={onGoHome}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryPressed]}
      >
        <Text style={styles.secondaryLabel}>Go Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: 24,
    marginBottom: 10,
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  body: {
    marginBottom: 28,
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
    minHeight: 44,
    justifyContent: 'center',
  },
  primaryPressed: {
    opacity: 0.85,
  },
  primaryLabel: {
    color: colors.background,
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 14,
    minHeight: 44,
    justifyContent: 'center',
  },
  secondaryPressed: {
    opacity: 0.7,
  },
  secondaryLabel: {
    color: colors.accent,
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
});
