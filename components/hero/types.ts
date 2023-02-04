import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

export interface HeroProps {
  isHomePage: boolean;
  children: ReactNode;
  imageSource: StaticImageData;
}
