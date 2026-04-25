'use client';

import { useEffect } from 'react';

function logDevServiceWorkerInstall(controller: ServiceWorker | null) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const message = controller
    ? 'PWA: new content available; refresh to update.'
    : 'PWA: content cached for offline use.';
  console.info(message);
}

function trackInstallingWorker(
  installingWorker: ServiceWorker,
  controller: ServiceWorker | null,
) {
  if (installingWorker.state !== 'installed') {
    return;
  }

  logDevServiceWorkerInstall(controller);
}

function bindInstallStateListener(
  installingWorker: ServiceWorker,
  controller: ServiceWorker | null,
) {
  installingWorker.onstatechange = () => {
    trackInstallingWorker(installingWorker, controller);
  };
}

async function unregisterDevServiceWorkers() {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) => registration.unregister()),
  );
}

async function registerProductionServiceWorker(isCancelled: () => boolean) {
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
    updateViaCache: 'none',
  });

  if (isCancelled()) {
    return;
  }

  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (!installingWorker) {
      return;
    }

    bindInstallStateListener(
      installingWorker,
      navigator.serviceWorker.controller,
    );
  };
}

export function PWARegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    let cancelled = false;
    const isCancelled = () => cancelled;

    const registerServiceWorker = async () => {
      if (process.env.NODE_ENV === 'development') {
        await unregisterDevServiceWorkers();
        return;
      }

      if (isCancelled()) {
        return;
      }

      try {
        await registerProductionServiceWorker(isCancelled);
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    };

    void registerServiceWorker();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
