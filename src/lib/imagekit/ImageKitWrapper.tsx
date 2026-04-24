'use client';

import { ImageKitProvider } from '@imagekit/next';
import { ReactNode, useMemo } from 'react';

function requireImageKitUrlEndpoint(): string {
  const url = process.env.NEXT_PUBLIC_IMAGEKIT_URL?.trim();
  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_IMAGEKIT_URL: set it in .env.local to your ImageKit URL endpoint.',
    );
  }
  return url;
}

interface ImageKitWrapperProps {
  children: ReactNode;
}

export const ImageKitWrapper = ({ children }: ImageKitWrapperProps) => {
  const urlEndpoint = useMemo(() => requireImageKitUrlEndpoint(), []);
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
  );
};

export default ImageKitWrapper;
