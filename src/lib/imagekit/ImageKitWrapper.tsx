'use client';

import { ImageKitProvider } from '@imagekit/next';
import { ReactNode } from 'react';
import { IMAGEKIT_BASE_URL } from './imagekit';

interface ImageKitWrapperProps {
  children: ReactNode;
}

export const ImageKitWrapper = ({ children }: ImageKitWrapperProps) => {
  return (
    <ImageKitProvider urlEndpoint={IMAGEKIT_BASE_URL}>
      {children}
    </ImageKitProvider>
  );
};

export default ImageKitWrapper;
