export enum ServiceId {
  WebDev = 'web-dev',
  Photography = 'photography',
  Video = 'video',
}

export interface ServiceDefinition {
  id: ServiceId;
  copyKey: 'webDev' | 'photography' | 'video';
  highlightKeys: string[];
}

export const serviceDefinitions: ServiceDefinition[] = [
  {
    id: ServiceId.WebDev,
    copyKey: 'webDev',
    highlightKeys: ['next', 'pwa', 'tailwind', 'api'],
  },
  {
    id: ServiceId.Photography,
    copyKey: 'photography',
    highlightKeys: ['brand', 'portrait', 'deliverables', 'grading'],
  },
  {
    id: ServiceId.Video,
    copyKey: 'video',
    highlightKeys: ['cinematic', 'post', 'social', 'vlog'],
  },
];
