const CACHE_NAME = 'gym‑tracker‑v1';
const FILES = [
  '/', '/index.html', '/style.css',
  '/script.js', '/manifest.json', '/icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
