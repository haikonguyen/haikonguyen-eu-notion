import Box from '@mui/material/Box';
import TemporaryDrawer from '../drawer';
import { siteConfig } from '../../constants';
import DrawerItemList from '../drawer/drawer-item-list';
import useStore from '@state/store';

const MobileNav = () => {
  const { isDrawerOpened, setIsDrawerOpened } = useStore();
  const drawerItems = siteConfig.navLinks;
  return (
    <Box className="flex grow justify-between items-center sm:flex lg:hidden">
      <TemporaryDrawer
        isDrawerEnabled={isDrawerOpened}
        onClick={() => setIsDrawerOpened()}
        anchor="left"
        onClose={() => setIsDrawerOpened()}
        isSettingNav={false}
      >
        <DrawerItemList anchor="left" drawerItems={drawerItems} hasLogo />
      </TemporaryDrawer>
    </Box>
  );
};

export default MobileNav;
