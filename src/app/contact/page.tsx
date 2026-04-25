import {
  AppPageShell,
  AppPageShellSize,
  PageHeader,
  PageHeaderAlign,
} from '@components/layout';
import { BookingForm, ContactForm } from '@features/contact';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return { title: t('contactTitle') };
}

export default async function ContactPage() {
  const t = await getTranslations('Contact');

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        align={PageHeaderAlign.Center}
      />
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-8">
          <BookingForm />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-4 text-lg font-bold">{t('directChannels')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">@</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t('email')}
                  </p>
                  <p className="font-medium">haiko@haikonguyen.eu</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  in
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t('linkedin')}
                  </p>
                  <p className="font-medium">haikonguyen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppPageShell>
  );
}
