import { AppPageShell, AppPageShellSize, PageHeader } from '@components/layout';
import { BentoGrid, BentoGridItem } from '@components/ui/BentoGrid';
import { getTranslations } from 'next-intl/server';
import { FaVideo, FaYoutube } from 'react-icons/fa';

export default async function VlogsPage() {
  const t = await getTranslations('Vlogs');

  return (
    <AppPageShell size={AppPageShellSize.Default}>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <BentoGrid className="md:auto-rows-[20rem]">
        <BentoGridItem
          className="md:col-span-2"
          title={t('codingTitle')}
          description={t('codingDescription')}
          header={
            <div className="group relative flex min-h-40 h-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
              <FaYoutube className="z-20 h-16 w-16 text-red-600 transition-transform group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 z-20 text-xs font-bold uppercase tracking-widest text-white/70">
                {t('codingMeta')}
              </div>
            </div>
          }
          icon={<FaYoutube className="h-4 w-4 text-red-600" />}
        />
        <BentoGridItem
          title={t('gearTitle')}
          description={t('gearDescription')}
          header={
            <div className="group relative flex min-h-40 h-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
              <FaYoutube className="z-20 h-12 w-12 text-red-600 transition-transform group-hover:scale-110" />
            </div>
          }
          icon={<FaYoutube className="h-4 w-4 text-red-600" />}
        />
        <BentoGridItem
          title={t('sfTitle')}
          description={t('sfDescription')}
          header={
            <div className="group relative flex min-h-[10rem] h-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
              <FaVideo className="z-20 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
            </div>
          }
          icon={<FaVideo className="h-4 w-4 text-primary" />}
        />
      </BentoGrid>
    </AppPageShell>
  );
}
