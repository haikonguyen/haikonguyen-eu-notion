import {
  YOUTUBE_HOSTNAMES,
  YOUTUBE_ID_LENGTH,
  YOUTUBE_ID_PATTERN,
} from './constants';

export interface YoutubeVideoRef {
  id: string;
  startSeconds: number | null;
}

function parseStartSeconds(url: URL): number | null {
  const rawStart = url.searchParams.get('start') ?? url.searchParams.get('t');
  if (!rawStart) {
    return null;
  }

  if (/^\d+$/.test(rawStart)) {
    return Number(rawStart);
  }

  const match = rawStart.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) {
    return null;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

export function parseYoutubeUrl(url: string): YoutubeVideoRef | null {
  try {
    const parsed = new URL(url.trim());
    if (!YOUTUBE_HOSTNAMES.has(parsed.hostname)) {
      return null;
    }

    const match = url.match(YOUTUBE_ID_PATTERN);
    const id = match?.[2];
    if (!id || id.length !== YOUTUBE_ID_LENGTH) {
      return null;
    }

    return {
      id,
      startSeconds: parseStartSeconds(parsed),
    };
  } catch {
    return null;
  }
}

export function getYoutubeId(url: string): string | null {
  return parseYoutubeUrl(url)?.id ?? null;
}
