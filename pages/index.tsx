import Head from 'next/head';
import React from 'react';
import { Divider } from '@mui/material';
import aboutProfileImg from '@images/aboutProfileImg.png';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { getDatabase } from '@utils/notion';
import { BlogPostListType } from 'notion';
import { Hero, PageContentWrapper, PostList, GlassWrapper } from '@components';
import { siteConfig } from '../constants';
import heroProfileImg from '@images/heroProfileImg.png';
import heroBg from '@images/heroBg.jpg';

const Index = ({ blogPostList }: BlogPostListType) => {
  const router = useRouter();
  const { title } = siteConfig;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Hero isHomePage imageSource={heroBg}>
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
      </Hero>
      <PageContentWrapper isPost={false}>
        {/* About Section */}
        <section>
          <h1 className="uppercase text-center">About</h1>
          <hr className="border-blue-500 max-w-[15%] mx-auto" />
          <div className="flex flex-wrap flex-col md:flex-row">
            <div className="sm:basis-6/12 md:basis-4/12 md:mr-6">
              <Image
                src={aboutProfileImg}
                alt="Hero image"
                placeholder="blur"
                className="rounded-2xl"
              />
            </div>
            <div className="sm:basis-6/12 md:basis-7/12">
              <p className="pt-0">
                Hello dear friend! Welcome to my personal blog. On this site you
                you can find my latest post primarily about things that are
                dearest to my heart. The main topics are usually tech related,
                such as DEVELOPMENT (mostly Web, because I am a web-developer),
                PHOTOGRAPHY, TRAVEL, VLOGS, GAMING and my personal stories. As I
                am self-taught developer and photographer, I would like to share
                throughout my writings my personal experience, and maybe inspire
                more people to learn in our SUPER FAST PACE WORLD :-). If you
                want to find out more about my story, be sure to click on the
                button below.
              </p>
              <Button variant="outlined" onClick={() => router.push('/about')}>
                Read my story
              </Button>
            </div>
          </div>
        </section>
        <Divider />
        {/* Blog Section */}
        <section>
          <h1 className="uppercase text-center">Latest Posts</h1>
          <hr className="border-blue-500 max-w-[15%] mx-auto" />
          <PostList blogPostList={blogPostList} />
        </section>
      </PageContentWrapper>
    </>
  );
};

export async function getStaticProps() {
  const { results } = await getDatabase(`${process.env.DATABASE_ID}`);

  return {
    props: {
      blogPostList: results.slice(0, 3),
    },
    revalidate: 1,
  };
}

export default Index;
