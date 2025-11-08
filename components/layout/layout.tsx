import { NavBar } from '../navbar';
import { LayoutProps } from './types';
import { Footer } from '../footer';
import { Toast } from '../toast';
import Box from '@mui/material/Box';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <Box
        component="main"
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          flex: '1 1 auto',
        })}
      >
        {children}
      </Box>

      <Footer />
      <Toast />
    </>
  );
};

export default Layout;
