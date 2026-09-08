import { collection, fields, singleton } from '@keystatic/core';
import { localizedTextField } from './localized';

const imageUrlDescription =
  'Paste a public ImageKit/R2/Unsplash URL, site path (e.g. /assets/images/…), or R2 object key. Do not commit image binaries.';

export const homeAboutSingleton = singleton({
  label: 'Home About',
  path: 'content/home-about',
  schema: {
    name: fields.text({ label: 'Name', defaultValue: 'Haiko Nguyen' }),
    role: fields.text({
      label: 'Role (EN fallback / Admin)',
      description:
        'Public UI uses next-intl Home.role / Home.intro. Keep EN here as CMS fallback.',
      defaultValue: 'Senior Software Engineer & Visual Artist',
    }),
    bio: fields.text({
      label: 'Bio (EN fallback / Admin)',
      description:
        'Public UI uses next-intl Home.intro. Keep EN here as CMS fallback.',
      multiline: true,
    }),
    portraitImage: fields.text({
      label: 'Portrait image URL or path',
      description: imageUrlDescription,
      defaultValue: '/assets/images/heroProfileImg.png',
    }),
    ctaHref: fields.text({
      label: 'CTA href',
      defaultValue: '/about',
    }),
  },
});

export const aboutCvSingleton = singleton({
  label: 'Interactive CV',
  path: 'content/about-cv',
  schema: {
    pdfUrl: fields.text({
      label: 'PDF resume URL',
      description: 'Optional download link (absolute URL or site path).',
    }),
    skills: fields.array(
      fields.object({
        label: localizedTextField('Skill label'),
        level: fields.integer({
          label: 'Level (0–100)',
          defaultValue: 80,
          validation: { min: 0, max: 100 },
        }),
        icon: fields.select({
          label: 'Icon',
          options: [
            { label: 'React / Next.js', value: 'react' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Tailwind', value: 'tailwind' },
            { label: 'Node.js', value: 'node' },
            { label: 'PostgreSQL', value: 'postgres' },
            { label: 'Photography', value: 'photo' },
          ],
          defaultValue: 'react',
        }),
      }),
      {
        label: 'Skills',
        itemLabel: (props) => props.fields.label.fields.en.value || 'Skill',
      },
    ),
    educationDegree: localizedTextField('Degree'),
    educationUniversity: localizedTextField('University'),
    educationFocus: localizedTextField('Education focus', { multiline: true }),
    experiences: fields.array(
      fields.object({
        role: localizedTextField('Role'),
        company: localizedTextField('Company'),
        period: localizedTextField('Period'),
        description: localizedTextField('Description', { multiline: true }),
        tech: fields.array(fields.text({ label: 'Tech' }), {
          label: 'Tech tags',
          itemLabel: (props) => props.value || 'Tech',
        }),
      }),
      {
        label: 'Experience',
        itemLabel: (props) => props.fields.role.fields.en.value || 'Role',
      },
    ),
  },
});

export const servicesCollection = collection({
  label: 'Services',
  slugField: 'title',
  path: 'content/services/*',
  columns: ['sortOrder'],
  schema: {
    title: fields.slug({ name: { label: 'Title (EN / slug)' } }),
    titleI18n: fields.object(
      {
        cs: fields.text({ label: 'Title CS' }),
        vi: fields.text({ label: 'Title VI' }),
      },
      { label: 'Title translations' },
    ),
    category: localizedTextField('Category'),
    description: localizedTextField('Description', { multiline: true }),
    highlights: fields.array(localizedTextField('Highlight'), {
      label: 'Highlights',
      itemLabel: (props) => props.fields.en.value || 'Highlight',
    }),
    ctaLabel: localizedTextField('CTA label'),
    icon: fields.select({
      label: 'Icon',
      options: [
        { label: 'Code', value: 'code' },
        { label: 'Camera', value: 'camera' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'code',
    }),
    contactServiceId: fields.text({
      label: 'Contact service id',
      description:
        'Used as ?service= query (e.g. web-dev, photography, video).',
    }),
    sortOrder: fields.integer({
      label: 'Sort order',
      defaultValue: 0,
    }),
  },
});
