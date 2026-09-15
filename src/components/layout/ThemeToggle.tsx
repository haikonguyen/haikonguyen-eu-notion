'use client';

import {
  persistThemeMode,
  readStoredThemeMode,
  subscribeToTheme,
  ThemeMode,
} from '@lib/theme';
import { cn } from '@lib/utils';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

export interface ThemeToggleProps {
  className?: string;
}

function nextThemeMode(theme: ThemeMode): ThemeMode {
  if (theme === ThemeMode.System) return ThemeMode.Dark;
  if (theme === ThemeMode.Dark) return ThemeMode.Light;
  return ThemeMode.System;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const t = useTranslations('Theme');
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readStoredThemeMode,
    () => ThemeMode.System,
  );

  return (
    <button
      type="button"
      onClick={() => persistThemeMode(nextThemeMode(theme))}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center gap-1.5 rounded-full border border-glass-border bg-glass-surface px-0 text-foreground/80 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 hover:border-primary/40 hover:scale-105 active:scale-95 sm:w-auto sm:px-3',
        className,
      )}
      title={t('title', { mode: t(theme) })}
      aria-label={t('toggle')}
    >
      {theme === ThemeMode.Dark && <Moon size={15} className="text-primary" />}
      {theme === ThemeMode.Light && (
        <Sun size={15} className="text-amber-400" />
      )}
      {theme === ThemeMode.System && (
        <Laptop size={15} className="text-primary" />
      )}
      <span className="hidden text-[11px] font-semibold tracking-wider capitalize sm:inline">
        {t(theme)}
      </span>
    </button>
  );
}
