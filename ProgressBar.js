import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/ThemeContext';

const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Sınav ekranında kullanılan seçenek butonu.
 * status: 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal-correct'
 */
export default function OptionButton({ index, text, status = 'idle', onPress, disabled }) {
  const { colors, spacing, radius, typography } = useAppTheme();

  const palette = {
    idle: { bg: colors.surfaceVariant, border: colors.outlineVariant, text: colors.onSurface },
    selected: { bg: colors.primaryContainer, border: colors.primary, text: colors.onPrimaryContainer },
    correct: { bg: colors.successContainer, border: colors.success, text: colors.onSurface },
    wrong: { bg: colors.errorContainer, border: colors.error, text: colors.onErrorContainer },
    'reveal-correct': { bg: colors.successContainer, border: colors.success, text: colors.onSurface },
  };

  const { bg, border, text: textColor } = palette[status] || palette.idle;

  const icon =
    status === 'correct' || status === 'reveal-correct'
      ? 'checkmark-circle'
      : status === 'wrong'
      ? 'close-circle'
      : null;

  const iconColor = status === 'wrong' ? colors.error : colors.success;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: bg,
          borderColor: border,
          borderRadius: radius.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.md,
          marginBottom: spacing.sm,
        },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={[styles.letterBadge, { borderColor: border, borderRadius: radius.full }]}>
        <Text style={[typography.labelLarge, { color: textColor }]}>{LETTERS[index]}</Text>
      </View>
      <Text style={[typography.bodyLarge, { color: textColor, flex: 1, marginLeft: spacing.sm }]}>
        {text}
      </Text>
      {icon && <Ionicons name={icon} size={22} color={iconColor} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
