export const YOUTUBE_HOSTNAMES = new Set([
  'youtu.be',
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
]);

export const YOUTUBE_ID_PATTERN =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]{11}).*/i;

export const YOUTUBE_ID_LENGTH = 11;

export const YOUTUBE_THUMBNAIL_BASE = 'https://i.ytimg.com/vi';
