'use client';

import { Toast } from '@components/common/toast';
import { usePathname } from 'next/navigation';
import { BottomNavigation } from '../BottomNavigation';
import { Footer } from '../footer';
import { NavBar } from '../navbar';
import { LayoutProps } from './types';

const KEYSTATIC_PATH_PREFIX = '/keystatic';

export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isKeystaticAdmin = pathname.startsWith(KEYSTATIC_PATH_PREFIX);

  if (isKeystaticAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
      <BottomNavigation />
      <Toast />
    </div>
  );
};
