import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, spacing, radius, typography } from './colors';

const THEME_STORAGE_KEY = '@ehliyet_sinav/theme_mode';

const ThemeContext = createContext(null);

/**
 * Uygulama genelinde tema (açık/koyu/otomatik) yönetimini sağlar.
 * Kullanıcı tercihi cihaz hafızasında saklanır.
 */
export function ThemeProvider({ children }) {
  const systemScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState('system'); // 'light' | 'dark' | 'system'
  const [systemColorScheme, setSystemColorScheme] = useState(systemScheme || 'light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved) setMode(saved);
    })();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  const activeScheme = mode === 'system' ? systemColorScheme : mode;
  const colors = activeScheme === 'dark' ? darkColors : lightColors;

  const toggleTheme = async () => {
    const next = activeScheme === 'dark' ? 'light' : 'dark';
    setMode(next);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, next);
  };

  const setThemeMode = async (newMode) => {
    setMode(newMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
  };

  const value = useMemo(
    () => ({
      colors,
      spacing,
      radius,
      typography,
      isDark: activeScheme === 'dark',
      mode,
      toggleTheme,
      setThemeMode,
    }),
    [colors, activeScheme, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme, ThemeProvider içinde kullanılmalıdır');
  return ctx;
}
