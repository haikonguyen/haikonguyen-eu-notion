import { ExperienceId, SkillId } from './types';

export const experienceItems = [
  {
    id: ExperienceId.Senior,
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: ExperienceId.UiUx,
    tech: ['React', 'Framer Motion', 'Styled Components', 'Figma'],
  },
  {
    id: ExperienceId.Freelance,
    tech: ['JavaScript', 'WordPress', 'Adobe Creative Suite', 'Photography'],
  },
] as const;

export const skillLevels: Record<SkillId, number> = {
  [SkillId.React]: 95,
  [SkillId.Typescript]: 90,
  [SkillId.Tailwind]: 95,
  [SkillId.Node]: 80,
  [SkillId.Postgres]: 75,
  [SkillId.Photo]: 90,
};
