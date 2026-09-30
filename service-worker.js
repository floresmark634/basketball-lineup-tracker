const CACHE_NAME = "cmt-basketball-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache =>
cache.addAll(APP_FILES)
)
);

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response =>
response || fetch(event.request)
)
);

});
