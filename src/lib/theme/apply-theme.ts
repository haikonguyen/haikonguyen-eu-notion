import { THEME_STORAGE_KEY, ThemeMode } from './constants';

export function readStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return ThemeMode.System;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === ThemeMode.Dark) return ThemeMode.Dark;
  if (stored === ThemeMode.Light) return ThemeMode.Light;
  return ThemeMode.System;
}

export function isSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const isDark =
    mode === ThemeMode.Dark || (mode === ThemeMode.System && isSystemDark());
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('light', !isDark);
}

export function persistThemeMode(mode: ThemeMode): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyThemeMode(mode);
  window.dispatchEvent(new Event('haiko-theme-change'));
}

export function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener('haiko-theme-change', callback);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('haiko-theme-change', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}
