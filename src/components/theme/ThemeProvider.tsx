'use client';

import {
  applyThemeMode,
  readStoredThemeMode,
  subscribeToTheme,
} from '@lib/theme';
import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
}

function getServerSnapshot() {
  return readStoredThemeMode();
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useSyncExternalStore(
    subscribeToTheme,
    readStoredThemeMode,
    getServerSnapshot,
  );

  if (typeof document !== 'undefined') {
    applyThemeMode(mode);
  }

  return children;
}
