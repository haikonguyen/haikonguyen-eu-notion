import type { Metadata } from 'next';
import { GlassWrapper, Hero, PageContentWrapper } from '@components';
import { ContactForm } from '@features/contact';
import contactPageBg from '@images/contactPageBg.jpeg';

export const metadata: Metadata = {
  title: 'Contact | Haiko Nguyen',
};

export default function ContactPage() {
  return (
    <>
      <Hero isHomePage={false} imageSource={contactPageBg}>
        <GlassWrapper>
          <h1>Contact</h1>
        </GlassWrapper>
      </Hero>
      <PageContentWrapper isPost={false}>
        <ContactForm />
      </PageContentWrapper>
    </>
  );
}
