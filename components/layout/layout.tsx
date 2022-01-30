import Meta from '../meta/meta';
import { Global } from '@emotion/react';
import useGlobalStyle from '@styles/global';
import { NavBar } from '../navbar';
import { LayoutProps } from './types';
import { Footer } from '../footer';
import { Toast } from '../toast';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Global styles={useGlobalStyle} />
      <NavBar />
      <main className="flex-auto">{children}</main>
      <Footer />
      <Toast />
    </>
  );
};

export default Layout;
