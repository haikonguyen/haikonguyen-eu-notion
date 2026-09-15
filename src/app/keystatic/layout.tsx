import { canAccessKeystaticAdmin } from '@lib/keystatic/assert-admin-access';
import { notFound } from 'next/navigation';
import KeystaticApp from './keystatic';

export default async function KeystaticLayout() {
  if (!(await canAccessKeystaticAdmin())) {
    notFound();
  }

  return <KeystaticApp />;
}
