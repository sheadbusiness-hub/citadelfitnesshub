const CACHE='citadel-hub-shell-v1';
const SHELL=['/','/manifest.webmanifest','/icons/icon-192.svg','/icons/icon-512.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;event.respondWith(fetch(req).then(response=>{if(response.ok&&req.mode==='navigate'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/',copy))}return response}).catch(()=>caches.match(req).then(cached=>cached||(req.mode==='navigate'?caches.match('/'):undefined))))});
