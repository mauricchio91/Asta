/* Service worker: tiene l'app in cache così funziona senza rete.
   Strategia: prima la rete con un tetto di 2,5 secondi, poi la copia locale.
   In una sala con connessione ballerina è la scelta giusta: non resti mai
   appeso ad attendere, ma quando c'è linea prendi la versione aggiornata. */
var CACHE = "asta-live-706d356b";
var FILES = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(FILES);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    new Promise(function (resolve) {
      var done = false;
      function fallback() {
        if (done) return; done = true;
        caches.match(r, { ignoreSearch: true }).then(function (hit) {
          resolve(hit || caches.match("./index.html"));
        });
      }
      var timer = setTimeout(fallback, 2500);
      fetch(r).then(function (res) {
        clearTimeout(timer);
        if (done) return;
        done = true;
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy); });
        resolve(res);
      }).catch(function () { clearTimeout(timer); fallback(); });
    })
  );
});
