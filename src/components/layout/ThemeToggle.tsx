'use client';

import { cn } from '@lib/utils';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

export enum ThemeMode {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

function getThemeSnapshot(): ThemeMode {
  if (typeof window === 'undefined') return ThemeMode.System;
  return (localStorage.getItem('haiko-theme') as ThemeMode) || ThemeMode.System;
}

function getServerSnapshot(): ThemeMode {
  return ThemeMode.System;
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    mediaQuery.removeEventListener('change', callback);
  };
}

function applyThemeMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDarkSystem = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  if (mode === ThemeMode.Dark || (mode === ThemeMode.System && isDarkSystem)) {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('Theme');
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot,
  );

  const handleToggle = () => {
    let nextTheme: ThemeMode = ThemeMode.Dark;
    if (theme === ThemeMode.System) nextTheme = ThemeMode.Dark;
    else if (theme === ThemeMode.Dark) nextTheme = ThemeMode.Light;
    else if (theme === ThemeMode.Light) nextTheme = ThemeMode.System;

    localStorage.setItem('haiko-theme', nextTheme);
    applyThemeMode(nextTheme);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        'relative flex h-9 w-9 sm:w-auto items-center justify-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-0 sm:px-3 text-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-white/30 hover:scale-105 active:scale-95',
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
      <span className="hidden capitalize text-[11px] font-semibold tracking-wider sm:inline">
        {t(theme)}
      </span>
    </button>
  );
}
