import React from 'react';
import { PageContentWrapperProps } from './types';

const PageContentWrapper = ({ children, isPost }: PageContentWrapperProps) => {
  return (
    <div
      className={`my-10 px-5 mx-auto ${
        isPost ? 'max-w-3xl' : 'max-w-6xl'
      } [&>section]:py-5 [&_hr]:pb-5`}
    >
      {children}
    </div>
  );
};

export default PageContentWrapper;
