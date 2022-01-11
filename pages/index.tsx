import Head from 'next/head';
import { CMS_NAME } from '@lib/constants';

const Index = () => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
    </>
  );
};

export default Index;
