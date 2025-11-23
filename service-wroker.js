const CACHE_NAME = "smart-campus-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/campus_navigator.html",
  "/start_nav.html",
  "/routes.html",
  "/nav_map.html",
  "/view_map.html",
  "/arrived.html",
  "/location_detail.html",

  "/css/mobile/profile.css",
  "/css/tablet/profile.css",
  "/css/destop/profile.css",

  "/js/pwa.js",        // 👈 global PWA file
  "/js/main.js",       // only for index.html
  "/js/routes.js",
  "/js/nav_map.js",
  "/js/view_map.js",
  "/js/arrived.js",
  "/js/location_detail.js",
  "/js/navigator.js",
  "/js/start_nav.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
