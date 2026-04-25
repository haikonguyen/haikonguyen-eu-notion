import type { GalleryPhoto } from '@components/ui/PhotoLightbox';
import {
  PortfolioCategory,
  type PortfolioVlog,
  PortfolioVlogId,
  type SoftwareProject,
  SoftwareProjectId,
} from './types';

export const DEV_PLACEHOLDER =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072';

export const VLOG_PLACEHOLDER =
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=2070';

export const PHOTO_ALT_KEYS = [
  'photoMistyPeaks',
  'photoUrbanSolitude',
  'photoSilentForest',
  'photoNeonNights',
  'photoSummitLight',
  'photoForestPath',
] as const;

export const photographyGallery: Omit<GalleryPhoto, 'alt'>[] = [
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070',
    width: 2070,
    height: 1380,
  },
  {
    src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=2070',
    width: 2070,
    height: 2756,
  },
  {
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2076',
    width: 2076,
    height: 1610,
  },
  {
    src: 'https://images.unsplash.com/photo-1493238792040-67141f11ebd2?auto=format&fit=crop&q=80&w=2070',
    width: 2070,
    height: 1380,
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2070',
    width: 2070,
    height: 1380,
  },
  {
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=2070',
    width: 2070,
    height: 1380,
  },
];

export const softwareProjects: SoftwareProject[] = [
  {
    id: SoftwareProjectId.QuantumCrm,
    image: DEV_PLACEHOLDER,
    tags: ['Software', 'Next.js 15'],
    tech: [
      'Next.js 15',
      'React 19',
      'Tailwind 4',
      'PostgreSQL',
      'Prisma',
      'TypeScript',
    ],
    github: 'https://github.com/haikonguyeneu/quantum',
    demo: 'https://quantum-crm.dev',
  },
  {
    id: SoftwareProjectId.NovaUi,
    image:
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=2070',
    tags: ['Design System', 'UI/UX'],
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Storybook'],
    github: 'https://github.com/haikonguyeneu/nova-ui',
  },
];

export const portfolioVlogs: PortfolioVlog[] = [
  {
    id: PortfolioVlogId.BehindTheScenes,
    duration: '14:32',
    thumbnail: VLOG_PLACEHOLDER,
    youtubeId: 'ScMzIvxBSi4',
  },
  {
    id: PortfolioVlogId.PragueWinter,
    duration: '8:14',
    thumbnail:
      'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=2070',
    youtubeId: 'kJQP7kiw5Fk',
  },
];

const categoryValues = new Set<string>(Object.values(PortfolioCategory));

export function parsePortfolioCategory(
  value: string | null,
): PortfolioCategory {
  if (value && categoryValues.has(value)) {
    return value as PortfolioCategory;
  }

  return PortfolioCategory.All;
}
