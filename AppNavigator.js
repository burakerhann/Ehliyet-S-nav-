import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

/**
 * Soru ilerlemesini gösteren ince çubuk.
 */
export default function ProgressBar({ progress }) {
  const { colors, radius } = useAppTheme();
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { backgroundColor: colors.surfaceVariant, borderRadius: radius.full }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: colors.primary,
            borderRadius: radius.full,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
