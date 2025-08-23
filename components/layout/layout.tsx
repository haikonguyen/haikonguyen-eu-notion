import { NavBar } from '../navbar';
import { LayoutProps } from './types';
import { Footer } from '../footer';
import { Toast } from '../toast';
import ThemeCssVariables from '../theme-css-variables/theme-css-variables';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ThemeCssVariables />
      <NavBar />
      <main className="flex-auto">{children}</main>
      <Footer />
      <Toast />
    </>
  );
};

export default Layout;
