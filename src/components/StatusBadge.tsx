import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import type { CharacterStatus } from '../types/api';

const STATUS_LABEL: Record<CharacterStatus, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
};

const STATUS_COLOR: Record<CharacterStatus, string> = {
  Alive: colors.statusAlive,
  Dead: colors.statusDead,
  unknown: colors.statusUnknown,
};

const STATUS_BG: Record<CharacterStatus, string> = {
  Alive: 'rgba(16, 185, 129, 0.15)',
  Dead: 'rgba(239, 68, 68, 0.15)',
  unknown: 'rgba(107, 114, 128, 0.20)',
};

export function StatusBadge({ status }: { status: CharacterStatus }) {
  const color = STATUS_COLOR[status];

  return (
    <View style={[styles.container, { backgroundColor: STATUS_BG[status] }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{STATUS_LABEL[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
});
