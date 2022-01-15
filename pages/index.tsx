import Head from 'next/head';
import { CMS_NAME } from '@lib/constants';
import Hero from '@components/hero';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Hero isHomePage />
    </>
  );
};

export default Index;
