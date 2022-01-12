import { LogoOnClickHandlerType } from '@components/navbar/types';

export const pages: string[] = ['About', 'Blog', 'Contact'];

export const LogoOnClickHandler: LogoOnClickHandlerType = (
  router,
  isDrawerOpened,
  setIsDrawerOpened
) => {
  router.push('/');
  setIsDrawerOpened();
};
