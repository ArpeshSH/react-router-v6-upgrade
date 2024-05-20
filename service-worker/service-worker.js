// Create Workbox service worker instance

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(/\S+.(css|js|png|gif|jpg)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
