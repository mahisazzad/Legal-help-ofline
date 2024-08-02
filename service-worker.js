// service-worker.js

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/gallery.html',
    '/service-worker.js',
    '/images/hero1.jpg', // Include all assets you want to cache
    '/images/hero2.jpg',
    '/images/hero3.jpg'
    '/chittagong.html'
    '/rajshahi.html'
    '/dhaka.html'
    '/khulna.html'
    '/manifest.json'
    '/others.html'
    '/script.js'
    '/thana-chittagong.html'
    '/thana-dhaka.html'
    '/thana-rajshahi.html'
    '/thana-khulna.html'
    '/uni.html'
    // Add more files as needed
];

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
