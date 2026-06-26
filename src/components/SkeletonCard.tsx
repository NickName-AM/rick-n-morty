import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme/colors';

export type SkeletonCardVariant = 'list-row' | 'compact' | 'hero';

export interface SkeletonCardProps {
  variant?: SkeletonCardVariant;
}

function ShimmerBlock({ style }: { style: StyleProp<ViewStyle> }) {
  const translateX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 200,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  }, [translateX]);

  return (
    <View style={[style, { overflow: 'hidden', backgroundColor: colors.placeholder }]}>
      <Animated.View
        style={[
          { ...StyleSheet.absoluteFillObject, width: '200%' },
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[colors.placeholder, colors.surface, colors.placeholder]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

export function SkeletonCard({ variant = 'list-row' }: SkeletonCardProps) {
  if (variant === 'hero') {
    return (
      <View style={styles.heroContainer}>
        <ShimmerBlock style={styles.heroLineLarge} />
        <ShimmerBlock style={styles.heroLineMedium} />
        <ShimmerBlock style={styles.heroLineSmall} />
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <ShimmerBlock style={styles.compactAvatar} />
        <ShimmerBlock style={styles.compactText} />
      </View>
    );
  }

  return (
    <View style={styles.listRowContainer}>
      <ShimmerBlock style={styles.listRowAvatar} />
      <View style={styles.listRowTextColumn}>
        <ShimmerBlock style={styles.listRowLinePrimary} />
        <ShimmerBlock style={styles.listRowLineSecondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  listRowAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  listRowTextColumn: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  listRowLinePrimary: {
    height: 14,
    width: '55%',
    borderRadius: 4,
  },
  listRowLineSecondary: {
    height: 12,
    width: '35%',
    borderRadius: 4,
  },
  compactContainer: {
    width: 108,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 10,
  },
  compactAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  compactText: {
    height: 12,
    width: '70%',
    borderRadius: 4,
  },
  heroContainer: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    minHeight: 210,
    gap: 10,
    justifyContent: 'center',
  },
  heroLineLarge: {
    height: 28,
    width: '30%',
    borderRadius: 4,
  },
  heroLineMedium: {
    height: 14,
    width: '70%',
    borderRadius: 4,
  },
  heroLineSmall: {
    height: 14,
    width: '50%',
    borderRadius: 4,
  },
});
