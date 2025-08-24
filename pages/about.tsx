import React from 'react';
import { GlassWrapper, Hero } from '@components';
import aboutPageBg from '@images/aboutPageBg.jpg';

const AboutPage = () => {
  return (
    <>
      <Hero isHomePage={false} imageSource={aboutPageBg}>
        <GlassWrapper>
          <h1>About</h1>
        </GlassWrapper>
      </Hero>
    </>
  );
};

export default AboutPage;
