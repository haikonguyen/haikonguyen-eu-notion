import '../styles/index.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/system';
import useCustomTheme from '@themes/main-theme';
import ClientOnly from '@components/client-only';
import Layout from '@components/layout/layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={useCustomTheme()}>
        <ClientOnly>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientOnly>
      </ThemeProvider>
    </>
  );
};

export default App;
