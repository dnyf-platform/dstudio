// sw.js - Service Worker for offline support & caching
const CACHE_NAME = 'dstudio-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './storage.js',
    './preview.js',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request).catch(() => caches.match('./index.html')))
    );
});
