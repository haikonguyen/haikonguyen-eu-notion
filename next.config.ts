import { xrayPlugin } from '@stinsky/xray/plugin';
import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import createNextIntlPlugin from 'next-intl/plugin';
import { ensureCodeInspectorServer } from './src/lib/dev/ensure-code-inspector-server';
import { xrayDevOptions } from './src/lib/dev/xray-dev-options';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const xrayRules = xrayPlugin(xrayDevOptions);

function getR2RemotePattern(): RemotePattern | null {
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim();
  if (!baseUrl) {
    return null;
  }

  try {
    const url = new URL(baseUrl);
    const protocol = url.protocol.replace(':', '');
    if (protocol !== 'http' && protocol !== 'https') {
      return null;
    }

    return {
      protocol,
      hostname: url.hostname,
      pathname: '/**',
    };
  } catch {
    return null;
  }
}

const r2RemotePattern = getR2RemotePattern();

const nextConfig: NextConfig = {
  turbopack: {
    rules: xrayRules,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      ...(r2RemotePattern ? [r2RemotePattern] : []),
    ],
  },
};

async function createConfig() {
  await ensureCodeInspectorServer();
  return withNextIntl(nextConfig);
}

export default createConfig();
