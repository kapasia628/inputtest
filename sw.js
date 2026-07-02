const CACHE_NAME = 'inputtest-cache-v8';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './admin.php',
    './battery.html',
    './biometric.html',
    './config.js',
    './display.html',
    './draw.html',
    './gamepad.html',
    './keyboard.html',
    './latency.html',
    './mic.html',
    './mouse.html',
    './printer.html',
    './privacy.html',
    './report.html',
    './terms.html',
    './robots.txt',
    './scanner.html',
    './sitemap.xml',
    './sound.html',
    './specs.html',
    './usb.html',
    './vr.html',
    './webcam.html',
    './lan.html',
    './hdmi.html',
    './vga.html',
    './usb-c.html',
    './blog.html',
    './blog-battery-health.html',
    './blog-drawing-tablet.html',
    './blog-gamepad-drift.html',
    './blog-keyboard-keys.html',
    './blog-microphone-setup.html',
    './blog-monitor-hz.html',
    './blog-mouse-double-click.html',
    './blog-network-jitter.html',
    './blog-usb-c-speeds.html',
    './blog-vga-calibration.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Install Event - Pre-cache diagnostic assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching diagnostic suite assets...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cached assets:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Stale-While-Revalidate caching strategy
self.addEventListener('fetch', event => {
    // Only cache local requests (HTTP/HTTPS)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                // Return cached asset immediately, fetch updated asset in background
                fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
                        }
                    })
                    .catch(err => console.log('[Service Worker] Offline fetch fallback: serving from cache'));
                return cachedResponse;
            }

            // Fallback to network
            return fetch(event.request).then(networkResponse => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                return networkResponse;
            });
        })
    );
});

// Push Event - Receive Remote Push Notifications
self.addEventListener('push', event => {
    let payload = { title: 'InputTest.online', body: 'New diagnostic utility ready for testing!', url: './index.html' };
    if (event.data) {
        try {
            payload = event.data.json();
        } catch (e) {
            payload.body = event.data.text();
        }
    }

    const options = {
        body: payload.body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: payload.url || './index.html'
        }
    };

    event.waitUntil(
        self.registration.showNotification(payload.title, options)
    );
});

// Notification Click Event - Open launch targets
self.addEventListener('notificationclick', event => {
    event.notification.close();
    const targetUrl = event.notification.data.url;
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // If already open, focus it
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
