const CACHE_NAME = 'haiko-pwa-v1';
const PRECACHE_ASSETS = [
  '/',
  '/favicon/apple-touch-icon.png',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
  '/assets/images/mainLogoOptimized.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache failed for some assets:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Skip Next.js dev server hot reload and API routes
  if (
    url.pathname.startsWith('/_next/webpack-hmr') ||
    url.pathname.startsWith('/api/')
  ) {
    return;
  }

  // For same-origin requests, use network-first with cache fallback
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
          });
        })
    );
  }
});
