'use client';

import { ImageKitWrapper } from '@lib/imagekit';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ImageKitWrapper>{children}</ImageKitWrapper>;
}
