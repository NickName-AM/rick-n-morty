import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import type { FilterStatus } from '../types/app';

const TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

interface FilterTabsProps {
  value: FilterStatus;
  onChange: (status: FilterStatus) => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = value === tab.value;

        return (
          <Pressable
            key={tab.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(tab.value)}
            style={({ pressed }) => [
              styles.tab,
              isActive ? styles.tabActive : styles.tabInactive,
              pressed && styles.tabPressed,
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    minHeight: 44,
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.accent,
  },
  tabInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabLabel: {
    fontSize: 13,
  },
  tabLabelActive: {
    color: colors.background,
    fontFamily: 'Inter_600SemiBold',
  },
  tabLabelInactive: {
    color: colors.textPrimary,
    fontFamily: 'Inter_400Regular',
  },
});
