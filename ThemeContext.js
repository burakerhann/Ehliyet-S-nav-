import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

/**
 * Material Design 3 stiline uygun yükseltilmiş (elevated) kart bileşeni.
 * onPress verilirse dokunulabilir hale gelir.
 */
export default function Card({ children, onPress, style, elevated = true }) {
  const { colors, radius, spacing, isDark } = useAppTheme();

  const cardStyle = [
    styles.base,
    {
      backgroundColor: colors.card,
      borderRadius: radius.lg,
      padding: spacing.md,
      borderWidth: isDark ? 1 : 0,
      borderColor: colors.outlineVariant,
    },
    elevated && !isDark && styles.shadow,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [...cardStyle, pressed && styles.pressed]}
        android_ripple={{ color: colors.outlineVariant }}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
  },
});
