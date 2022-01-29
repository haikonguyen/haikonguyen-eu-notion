import { ReactNode } from 'react';
import { ImageProps } from 'next/image';

export interface HeroProps {
  isHomePage: boolean;
  children: ReactNode;
  imageSource: ImageProps;
}
