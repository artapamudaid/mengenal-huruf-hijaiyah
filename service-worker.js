/* =========================
   SERVICE WORKER v2
   Belajar Huruf Hijaiyah
   ========================= */

const CACHE_NAME = "hijaiyah-pwa-v5";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/kuis.html",
  "/manifest.json",
  "/service-worker.js",
  "/assets/audio/hijaiyah/a.wav",
  "/assets/audio/hijaiyah/ba.wav",
  "/assets/audio/hijaiyah/ta.wav",
  "/assets/audio/hijaiyah/tsa.wav",
  "/assets/audio/hijaiyah/ja.wav",
  "/assets/audio/hijaiyah/kha.wav",
  "/assets/audio/hijaiyah/kho.wav",
  "/assets/audio/hijaiyah/da.wav",
  "/assets/audio/hijaiyah/dza.wav",
  "/assets/audio/hijaiyah/ro.wav",
  "/assets/audio/hijaiyah/za.wav",
  "/assets/audio/hijaiyah/sa.wav",
  "/assets/audio/hijaiyah/sya.wav",
  "/assets/audio/hijaiyah/sho.wav",
  "/assets/audio/hijaiyah/dho.wav",
  "/assets/audio/hijaiyah/tho.wav",
  "/assets/audio/hijaiyah/dzo.wav",
  "/assets/audio/hijaiyah/nga.wav",
  "/assets/audio/hijaiyah/gho.wav",
  "/assets/audio/hijaiyah/fa.wav",
  "/assets/audio/hijaiyah/qo.wav",
  "/assets/audio/hijaiyah/ka.wav",
  "/assets/audio/hijaiyah/la.wav",
  "/assets/audio/hijaiyah/ma.wav",
  "/assets/audio/hijaiyah/na.wav",
  "/assets/audio/hijaiyah/ha.wav",
  "/assets/audio/hijaiyah/wa.wav",
  "/assets/audio/hijaiyah/ya.wav",

  /* Audio Feedback */
  "/assets/audio/feedback/benar.wav",
  "/assets/audio/feedback/salah.wav",
  "/assets/audio/feedback/sempurna.wav",
  "/assets/audio/feedback/bagus.wav",
  "/assets/audio/feedback/kurang.wav",

  /* Library Offline */
  "/assets/js/confetti.min.js",
  "/assets/js/sweetalert2.min.js",
];

/* INSTALL */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        }).catch(() => {
          /* Fallback jika offline total */
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
