'use client';

import { ThemeProvider } from 'next-themes';
import { ImageKitWrapper } from '@lib/imagekit';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <ImageKitWrapper>{children}</ImageKitWrapper>
      </TooltipProvider>
    </ThemeProvider>
  );
}
