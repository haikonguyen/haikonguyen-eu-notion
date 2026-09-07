'use client';

import { cn } from '@lib/utils';
import Image, { type ImageProps } from 'next/image';
import { useRef, useState } from 'react';

const FADE_CLASS =
  'opacity-0 transition-[opacity,transform] duration-500 ease-out';

export type FadeInImageProps = ImageProps;

function revealAfterPaint(reveal: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(reveal);
  });
}

export function FadeInImage({
  className,
  onLoad,
  alt,
  ...props
}: FadeInImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const hasRevealedRef = useRef(false);

  const reveal = () => {
    if (hasRevealedRef.current) {
      return;
    }
    hasRevealedRef.current = true;
    revealAfterPaint(() => setIsLoaded(true));
  };

  return (
    <Image
      {...props}
      alt={alt}
      ref={(node) => {
        if (node?.complete && node.naturalWidth > 0) {
          reveal();
        }
      }}
      onLoad={(event) => {
        reveal();
        onLoad?.(event);
      }}
      className={cn(FADE_CLASS, isLoaded && 'opacity-100', className)}
    />
  );
}
