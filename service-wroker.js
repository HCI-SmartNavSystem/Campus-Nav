self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("campus-cache-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/mobile/profile.css",
        "/css/tablet/profile.css",
        "/css/destop/profile.css",
        "/js/main.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
