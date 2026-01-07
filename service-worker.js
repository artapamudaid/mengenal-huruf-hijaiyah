const CACHE_NAME = "hijaiyah-pwa-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
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
  "/assets/audio/hijaiyah/ya.wav"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
