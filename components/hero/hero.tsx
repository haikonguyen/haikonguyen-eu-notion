import React from 'react';
import Image from 'next/image';
import { HeroProps } from './types';
import HeroWrapper from './styles';

const Hero = ({ isHomePage, children, imageSource }: HeroProps) => {
  return (
    <HeroWrapper
      className="relative flex items-center justify-center w-screen"
      isHomePage={isHomePage}
    >
      <Image
        src={imageSource as any}
        objectFit="cover"
        layout="fill"
        alt="Hero image"
        placeholder="blur"
        className="brightness-75"
      />
      {children}
    </HeroWrapper>
  );
};

export default Hero;
