import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Image from 'next/image';
import mainLogo from '../../public/assets/images/mainLogoOptimized.png';
import MobileNav from '@components/navbar/mobile-nav';
import DesktopNav from '@components/navbar/desktop-nav';
import { useRouter } from 'next/router';
import tw from 'twin.macro';

const NavBar = () => {
  const router = useRouter();
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Desktop Logo*/}
          <IconButton
            css={tw`mr-2 hidden md:flex`}
            aria-label="menu"
            onClick={() => router.push('/')}
          >
            <Image width={40} height={40} src={mainLogo} alt="The logo" />
          </IconButton>
          {/* Mobile Nav */}
          <MobileNav />
          {/* Desktop Nav */}
          <DesktopNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
