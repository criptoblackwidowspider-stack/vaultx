const CACHE_NAME = 'vaultx-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://accounts.google.com/gsi/client',
  'https://rose-central-chameleon-281.mypinata.cloud/ipfs/bafybeifroooilpfbzt4hmgz4dv2kbmz5mebppihay3v5tg353vegs23i2m',
  'https://rose-central-chameleon-281.mypinata.cloud/ipfs/bafkreicauohky5m36h6ryek6eikasvd7fuhj4ykomgeblzu6acj5zr64pq',
  'https://rose-central-chameleon-281.mypinata.cloud/ipfs/bafkreidxbz2hpuxpx5helv2z3cnjnh4mo7yvfflihju7uqspevr6mekvoy',
  'https://rose-central-chameleon-281.mypinata.cloud/ipfs/bafkreih3zlpiiqe4gyjcdqyy2p3jatryjemai4vz4lclu24xibvv32or3a'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          return response;
        });
      })
  );
});
