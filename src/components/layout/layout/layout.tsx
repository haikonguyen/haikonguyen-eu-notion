'use client';

import { Toast } from '@components/common/toast';
import { BottomNavigation } from '../BottomNavigation';
import { Footer } from '../footer';
import { NavBar } from '../navbar';
import { LayoutProps } from './types';

export const Layout = ({ children }: LayoutProps) => {
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
