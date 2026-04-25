import { cn } from '@lib/utils';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn('w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8', className)}
    >
      {children}
    </div>
  );
};

export default Container;
