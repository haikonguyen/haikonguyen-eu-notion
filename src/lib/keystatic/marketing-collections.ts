import { collection, fields, singleton } from '@keystatic/core';

const imageUrlDescription =
  'Paste a public ImageKit/R2/Unsplash URL, site path (e.g. /assets/images/…), or R2 object key. Do not commit image binaries.';

export const homeAboutSingleton = singleton({
  label: 'Home About',
  path: 'content/home-about',
  schema: {
    name: fields.text({ label: 'Name', defaultValue: 'Haiko Nguyen' }),
    role: fields.text({
      label: 'Role',
      defaultValue: 'Senior Software Engineer & Visual Artist',
    }),
    bio: fields.text({
      label: 'Bio',
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
        label: fields.text({ label: 'Skill label' }),
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
        itemLabel: (props) => props.fields.label.value || 'Skill',
      },
    ),
    educationDegree: fields.text({ label: 'Degree' }),
    educationUniversity: fields.text({ label: 'University' }),
    educationFocus: fields.text({
      label: 'Education focus',
      multiline: true,
    }),
    experiences: fields.array(
      fields.object({
        role: fields.text({ label: 'Role' }),
        company: fields.text({ label: 'Company' }),
        period: fields.text({ label: 'Period' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        tech: fields.array(fields.text({ label: 'Tech' }), {
          label: 'Tech tags',
          itemLabel: (props) => props.value || 'Tech',
        }),
      }),
      {
        label: 'Experience',
        itemLabel: (props) => props.fields.role.value || 'Role',
      },
    ),
  },
});

export const servicesCollection = collection({
  label: 'Services',
  slugField: 'title',
  path: 'content/services/*',
  columns: ['sortOrder', 'category'],
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    category: fields.text({ label: 'Category' }),
    description: fields.text({
      label: 'Description',
      multiline: true,
    }),
    highlights: fields.array(fields.text({ label: 'Highlight' }), {
      label: 'Highlights',
      itemLabel: (props) => props.value || 'Highlight',
    }),
    ctaLabel: fields.text({ label: 'CTA label' }),
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
