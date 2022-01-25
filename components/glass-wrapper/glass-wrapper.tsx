import React from 'react';

interface GlassWrapperProps {
  children: React.ReactNode;
}

const GlassWrapper = ({ children }: GlassWrapperProps) => {
  return (
    <div className="rounded-md z-10 flex items-center flex-col p-5 backdrop-filter backdrop-blur-sm bg-white bg-opacity-30 border-gray-200">
      {children}
    </div>
  );
};

export default GlassWrapper;
