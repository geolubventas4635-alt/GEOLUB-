const C = 'geolub-v2';

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(C).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './geolub-logo.png',
        './geolub-icon-512.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== C)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
