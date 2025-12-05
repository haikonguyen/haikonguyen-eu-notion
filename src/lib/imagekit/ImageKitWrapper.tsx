'use client';

import { ImageKitProvider } from '@imagekit/next';
import { ReactNode } from 'react';

const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL || 'https://ik.imagekit.io/8qy7obkhf';

interface ImageKitWrapperProps {
  children: ReactNode;
}

export const ImageKitWrapper = ({ children }: ImageKitWrapperProps) => {
  return (
    <ImageKitProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>
      {children}
    </ImageKitProvider>
  );
};

export default ImageKitWrapper;
