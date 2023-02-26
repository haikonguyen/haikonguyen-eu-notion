import '../styles/index.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/system';
import useCustomTheme from '@themes/main-theme';
import { ClientOnly, Layout } from '@components';
import { DefaultSeo } from 'next-seo';
import { SEO } from '@utils/seo';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={useCustomTheme()}>
        <ClientOnly>
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </ClientOnly>
      </ThemeProvider>
    </>
  );
};

export default App;
