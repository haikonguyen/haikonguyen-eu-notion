import React from 'react';
import Image from 'next/image';
import heroBg from '@images/heroBg.jpg';
import heroProfileImg from '@images/heroProfileImg.png';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { HeroProps } from './types';
import HeroWrapper from './styles';
import GlassWrapper from '../glass-wrapper/glass-wrapper';

const Hero = ({ isHomePage }: HeroProps) => {
  const router = useRouter();
  return (
    <HeroWrapper
      className="relative flex items-center justify-center w-screen"
      isHomePage={isHomePage}
    >
      <Image
        src={heroBg}
        objectFit="cover"
        layout="fill"
        alt="Hero image"
        placeholder="blur"
        className="brightness-75"
      />
      <GlassWrapper>
        <section>
          <Image
            src={heroProfileImg}
            width={150}
            height={150}
            alt="Hero image"
            placeholder="blur"
            className="rounded-full"
          />
        </section>
        <section>
          <h1>Haiko Nguyen</h1>
          <p>DEVELOPER, PHOTOGRAPHER, VLOGGER</p>
        </section>
        <section>
          <Button variant="contained" onClick={() => router.push('/contact')}>
            Contact Me
          </Button>
        </section>
      </GlassWrapper>
    </HeroWrapper>
  );
};

export default Hero;
