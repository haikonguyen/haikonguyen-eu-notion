'use client';

import { ThemeProvider } from '@mui/system';
import useCustomTheme from '@themes/main-theme';
import { ImageKitWrapper } from '@lib/imagekit';
import { ReactNode, useEffect, useState } from 'react';

/**
 * Client-side providers wrapper
 * Uses mounted state to prevent hydration mismatch with theme/store
 */
export function Providers({ children }: { children: ReactNode }) {
  const theme = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children without ThemeProvider to avoid mismatching initial render
    // Or return a placeholder if the structure needs to be strictly maintained
    return (
      <ImageKitWrapper>
        {/* We wrap in ImageKitWrapper but wait for ThemeProvider to avoid hydration-jump */}
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ImageKitWrapper>
    );
  }

  return (
    <ImageKitWrapper>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ImageKitWrapper>
  );
}
