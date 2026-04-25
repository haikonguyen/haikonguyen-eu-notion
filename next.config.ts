import { xrayPlugin } from '@stinsky/xray/plugin';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { ensureCodeInspectorServer } from './src/lib/dev/ensure-code-inspector-server';
import { xrayDevOptions } from './src/lib/dev/xray-dev-options';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const xrayRules = xrayPlugin(xrayDevOptions);

const nextConfig: NextConfig = {
  turbopack: {
    rules: xrayRules,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/8qy7obkhf/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'socialistmodernism.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
};

async function createConfig() {
  await ensureCodeInspectorServer();
  return withNextIntl(nextConfig);
}

export default createConfig();
