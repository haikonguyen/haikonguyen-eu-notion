import { isKeystaticAdminEnabled } from '@lib/keystatic/is-admin-enabled';
import { notFound } from 'next/navigation';
import KeystaticApp from './keystatic';

export const dynamic = 'force-dynamic';

export default function KeystaticLayout() {
  if (!isKeystaticAdminEnabled()) {
    notFound();
  }

  return <KeystaticApp />;
}
