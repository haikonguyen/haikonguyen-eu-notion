import { ListItemClickHandlerType, ToggleDrawerType } from './types';

export const toggleDrawer: ToggleDrawerType = (isDrawerOpened, setOpenDrawer) =>
  setOpenDrawer();

export const listItemClickHandler: ListItemClickHandlerType = (
  router,
  link,
  isDrawerOpened,
  setIsDrawerOpened
) => {
  setIsDrawerOpened();
  router.push(link.toLocaleLowerCase()).then((r) => r);
};
