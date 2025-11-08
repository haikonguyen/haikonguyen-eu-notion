import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Image from 'next/image';
import mainLogo from '../../public/assets/images/mainLogoOptimized.png';
import { useRouter } from 'next/router';
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';
import SettingsNav from './settings-nav';

const NavBar = () => {
  const router = useRouter();
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Desktop Logo*/}
          <IconButton
            className="mr-2 hidden lg:flex"
            aria-label="menu"
            onClick={() => router.push('/')}
          >
            <Image width={40} height={40} src={mainLogo} alt="The logo" />
          </IconButton>
          {/* Mobile Nav */}
          <MobileNav />
          {/* Desktop Nav */}
          <DesktopNav />
          {/* Settings Nav */}
          <SettingsNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
