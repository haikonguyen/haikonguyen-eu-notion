import type { ReactNode } from 'react';
import KeystaticApp from './keystatic';

interface KeystaticLayoutProps {
  children: ReactNode;
}

export default function KeystaticLayout({ children }: KeystaticLayoutProps) {
  return (
    <>
      <KeystaticApp />
      {children}
    </>
  );
}
