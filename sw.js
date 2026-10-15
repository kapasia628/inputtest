const CACHE_NAME = 'inputtest-cache-v12';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './about.html',
    './contact.html',
    './software.html',
    './mouse-double-click-fixer.html',
    './mouse-scroll-wheel-fixer.html',
    './mouse-dpi-tester.html',
    './battery.html',
    './biometric.html',
    './config.js',
    './i18n.js',
    './badge-generator.js',
    './display.html',
    './draw.html',
    './gamepad.html',
    './keyboard.html',
    './latency.html',
    './mic.html',
    './mouse.html',
    './scroll-test.html',
    './mouse-polling-rate.html',
    './mouse-double-click-test.html',
    './keyboard-chatter-test.html',
    './controller-stick-drift-test.html',
    './monitor-ghosting-test.html',
    './mouse-angle-snapping-test.html',
    './audio-frequency-test.html',
    './controller-circularity-test.html',
    './cps-test.html',
    './typing.html',
    './reaction.html',
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
    './llms.txt',
    './blog.html',
    './blog-battery-health.html',
    './blog-battery-cycles.html',
    './blog-drawing-tablet.html',
    './blog-gamepad-drift.html',
    './blog-dualshock-drift.html',
    './blog-keyboard-keys.html',
    './blog-microphone-setup.html',
    './blog-monitor-hz.html',
    './blog-mouse-double-click.html',
    './blog-mouse-polling-rate.html',
    './blog-network-jitter.html',
    './blog-headphone-test.html',
    './blog-usb-c-speeds.html',
    './blog-vga-calibration.html',
    './blog-webcam-resolution.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './favicon.ico'
];

// Install Event - Pre-cache diagnostic assets with skipWaiting
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching diagnostic suite assets...');
                return Promise.allSettled(
                    ASSETS_TO_CACHE.map(url => cache.add(url).catch(err => console.warn('Cache add skipped for ' + url, err)))
                );
            })
    );
});

// Activate Event - Clean up old caches and claim all clients immediately
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Purging outdated cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Network-First for Navigation, Stale-While-Revalidate for Assets
self.addEventListener('fetch', event => {
    // Only cache GET requests originating from our domain
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // HTML Navigation requests: ALWAYS NETWORK-FIRST (guarantees latest fresh content)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                    }
                    return networkResponse;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Static Assets: Stale-While-Revalidate
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                }
                return networkResponse;
            }).catch(() => cachedResponse);

            return cachedResponse || fetchPromise;
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
