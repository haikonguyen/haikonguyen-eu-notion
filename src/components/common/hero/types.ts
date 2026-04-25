import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface HeroProps {
  isHomePage: boolean;
  children: ReactNode;
  imageSource: StaticImageData;
}
