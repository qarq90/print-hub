const CACHE_NAME = "PRINTHUB_V1";

// Cache core assets during installation
async function cacheCoreAssets() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll([
        '/',
        '/favicon256x256.png',
        // Add other essential static assets here
    ]);
}

self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    event.waitUntil(cacheCoreAssets());
    self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');

    // Clean up old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control immediately
});

// Basic caching strategy - Cache First
async function cacheFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        // Try to get from cache first
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            console.log('Serving from cache:', request.url);
            return cachedResponse;
        }

        // If not in cache, fetch from network
        console.log('Fetching from network:', request.url);
        const networkResponse = await fetch(request);

        // Cache the new response for future use
        if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            cache.put(request, responseClone);
        }

        return networkResponse;
    } catch (error) {
        console.error('Cache first strategy failed:', error);

        // If both cache and network fail, you could serve a fallback
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return offline page or fallback for navigation requests
        if (request.mode === 'navigate') {
            return cache.match('/offline'); // Create an offline.html page
        }

        // For other requests, you might return a placeholder
        return new Response('Network error', {
            status: 408,
            statusText: 'Network error'
        });
    }
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests and external resources if needed
    if (event.request.method !== 'GET') {
        return;
    }

    // Apply caching strategy to all GET requests
    event.respondWith(cacheFirstStrategy(event.request));
});