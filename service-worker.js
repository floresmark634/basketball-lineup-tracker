const CACHE_NAME = "cmt-basketball-v3";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./app-icon.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", event => {

self.skipWaiting();

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache =>
cache.addAll(APP_FILES)
)
);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys()
.then(cacheNames =>

Promise.all(

cacheNames
.filter(name =>
name !== CACHE_NAME
)
.map(name =>
caches.delete(name)
)

)

)
.then(() =>
self.clients.claim()
)

);

});

self.addEventListener("fetch", event => {

if (event.request.mode === "navigate") {

event.respondWith(

fetch(event.request)
.catch(() =>
caches.open(CACHE_NAME)
.then(cache =>
cache.match("./index.html")
)
)

);

return;
}

event.respondWith(

caches.open(CACHE_NAME)
.then(cache =>

cache.match(event.request)
.then(cachedResponse =>

cachedResponse ||
fetch(event.request)

)

)

);

});
