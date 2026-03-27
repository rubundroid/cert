const CACHE_NAME = 'ecert-cache-v1';

// ഓഫ്ലൈൻ ആയി വർക്ക് ചെയ്യാൻ സേവ് ചെയ്തു വെക്കേണ്ട ഫയലുകൾ
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png'
  // താങ്കളുടെ CSS, JS എന്നിവ വേറെ ഫയലുകൾ ആണെങ്കിൽ അവയുടെ പേരും ഇവിടെ കോമ ഇട്ട് നൽകാം (ഉദാഹരണത്തിന്: '/style.css', '/script.js')
];

// ഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ ഫയലുകൾ കാഷെ (Cache) ചെയ്യുന്നു
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ഇന്റർനെറ്റ് ഇല്ലാത്തപ്പോൾ കാഷെയിൽ നിന്ന് ഫയലുകൾ എടുത്ത് നൽകുന്നു
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // കാഷെയിൽ ഉണ്ടെങ്കിൽ അത് നൽകുക
        if (response) {
          return response;
        }
        // ഇല്ലെങ്കിൽ ഇന്റർനെറ്റിൽ നിന്ന് എടുക്കുക
        return fetch(event.request);
      })
  );
});
