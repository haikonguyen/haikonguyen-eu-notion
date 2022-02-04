import React from 'react';
import Head from 'next/head';
import { GlassWrapper, Hero, PageContentWrapper } from '@components';
import contactPageBg from '@images/contactPageBg.jpeg';
import { Paper } from '@mui/material';
import ContactForm from '../components/contact-form/contact-form';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Haiko Nguyen</title>
      </Head>
      <Hero isHomePage={false} imageSource={contactPageBg}>
        <GlassWrapper>
          <h1>Contact</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost={false}>
        <section>
          <Paper
            className="max-w-lg mx-auto my-0 p-10 flex rounded-lg"
            elevation={3}
          >
            <ContactForm />
          </Paper>
        </section>
      </PageContentWrapper>
    </>
  );
};

export default ContactPage;
