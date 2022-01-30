import { LogoOnClickHandlerType } from './types';

export const LogoOnClickHandler: LogoOnClickHandlerType = (
  router,
  isDrawerOpened,
  setIsDrawerOpened
) => {
  router.push('/');
  setIsDrawerOpened();
};
