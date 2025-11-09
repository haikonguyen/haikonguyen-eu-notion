import React, { ReactNode, useEffect } from 'react';

/**
 * This component ensures that its children are only rendered on the client-side.
 * It prevents server-side rendering (SSR) for components that depend on
 * browser-only APIs (like `window` or `localStorage`).
 *
 * TODO: Refactor the application to use the Next.js App Router.
 * This will allow replacing this `ClientOnly` component with more modern patterns
 * like `next/dynamic` with `ssr: false` or by using the `"use client"` directive.
 */

interface ClientOnlyProps {
  children: ReactNode;
  delegated?: ReactNode;
}

const ClientOnly = ({ children, ...delegated }: ClientOnlyProps) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <React.Fragment {...delegated}>{children}</React.Fragment>;
};

export default ClientOnly;
