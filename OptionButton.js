import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/ThemeContext';

/**
 * Material Design 3 tarzı, dolgulu (filled) birincil eylem butonu.
 */
export default function PrimaryButton({
  title,
  onPress,
  icon,
  variant = 'filled', // 'filled' | 'outlined' | 'text'
  color,
  disabled = false,
  loading = false,
  style,
}) {
  const { colors, spacing, radius, typography } = useAppTheme();
  const baseColor = color || colors.primary;

  const containerStyle = [
    styles.base,
    {
      borderRadius: radius.full,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    variant === 'filled' && { backgroundColor: disabled ? colors.disabled : baseColor },
    variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: disabled ? colors.disabled : baseColor,
    },
    variant === 'text' && { backgroundColor: 'transparent' },
    style,
  ];

  const textColor =
    variant === 'filled' ? colors.onPrimary : disabled ? colors.disabled : baseColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [...containerStyle, pressed && !disabled && styles.pressed]}
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <>
            {icon && <Ionicons name={icon} size={20} color={textColor} style={{ marginRight: 8 }} />}
            <Text style={[typography.labelLarge, { color: textColor }]}>{title}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
