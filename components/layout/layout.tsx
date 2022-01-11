import Footer from '../footer';
import Meta from '../meta';
import { Global } from '@emotion/react';
import { LayoutProps } from '@components/layout/types';
import useGlobalStyle from '@styles/global';
import NavBar from '@components/navbar';
import TestComp from '@components/testComp';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Global styles={useGlobalStyle} />
      <NavBar />
      <TestComp hasHover />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
