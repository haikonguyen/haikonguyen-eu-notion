'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/system';
import useCustomTheme from '@themes/main-theme';
import { ImageKitWrapper } from '@lib/imagekit';
import { ReactNode } from 'react';

/**
 * Client-side providers wrapper.
 * AppRouterCacheProvider aligns Emotion SSR with the client to avoid MUI hydration mismatches.
 */
export function Providers({ children }: { children: ReactNode }) {
  const theme = useCustomTheme();

  return (
    <AppRouterCacheProvider>
      <ImageKitWrapper>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ImageKitWrapper>
    </AppRouterCacheProvider>
  );
}
