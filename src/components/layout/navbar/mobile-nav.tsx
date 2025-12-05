'use client';

import Box from '@mui/material/Box';
import { DrawerItemList, TemporaryDrawer } from '../drawer';
import { siteConfig } from '@config';
import { useStore } from '@lib/store';

export const MobileNav = () => {
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
