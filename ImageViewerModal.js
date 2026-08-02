import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/ThemeContext';

/**
 * Sınav süresi için geri sayım göstergesi.
 * secondsLeft dışarıdan (parent state) yönetilir; bu bileşen sadece
 * saniyede bir tick üretip görselleştirme yapar.
 */
export default function Timer({ secondsLeft, onTick, onExpire }) {
  const { colors, spacing, radius, typography } = useAppTheme();
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      onTick((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onExpire && onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isCritical = secondsLeft <= 60;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isCritical ? colors.errorContainer : colors.primaryContainer,
          borderRadius: radius.full,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
        },
      ]}
    >
      <Ionicons
        name="time-outline"
        size={16}
        color={isCritical ? colors.error : colors.onPrimaryContainer}
      />
      <Text
        style={[
          typography.labelLarge,
          {
            marginLeft: 4,
            color: isCritical ? colors.error : colors.onPrimaryContainer,
          },
        ]}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
