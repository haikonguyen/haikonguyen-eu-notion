'use client';

import { Calendar, Camera, FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ACTIONS = [
  { href: '/#book-a-call', icon: Calendar, key: 'book' },
  { href: '/contact', icon: Mail, key: 'contact' },
  { href: '/about', icon: FileText, key: 'cv' },
  { href: '/portfolio', icon: Camera, key: 'work' },
] as const;

export function HomeQuickActions() {
  const t = useTranslations('Home');

  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4">
      {ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.key}
            href={action.href}
            className="flex items-center gap-3 rounded-3xl border border-glass-border bg-glass-surface px-4 py-4 backdrop-blur-2xl transition-all hover:border-primary/40 hover:bg-glass-surface-hover"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Icon size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t(`quickActions.${action.key}`)}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
