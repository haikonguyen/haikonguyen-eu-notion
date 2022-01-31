import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import mainLogo from '@images/mainLogoOptimized.png';
import React from 'react';
import { Divider } from '@mui/material';
import { DrawerItemListProps } from './types';
import { LogoOnClickHandler } from '../navbar/utils';
import { listItemClickHandler } from './utils';
import useStore from '@state/store';

const DrawerItemList = ({
  anchor,
  drawerItems,
  hasLogo,
}: DrawerItemListProps) => {
  const router = useRouter();
  const { isDrawerOpened, setIsDrawerOpened } = useStore();
  return (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      }}
    >
      <List>
        {hasLogo && (
          <>
            <IconButton
              aria-label="menu"
              onClick={() =>
                LogoOnClickHandler(router, isDrawerOpened, setIsDrawerOpened)
              }
            >
              <Image width={40} height={40} src={mainLogo} alt="The logo" />
            </IconButton>
            <Divider />
          </>
        )}
        {drawerItems.map((link) => (
          <ListItem
            button
            key={link.id}
            onClick={() =>
              listItemClickHandler(
                router,
                link.url,
                isDrawerOpened,
                setIsDrawerOpened
              )
            }
          >
            <ListItemText primary={link.label.toUpperCase()} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DrawerItemList;
