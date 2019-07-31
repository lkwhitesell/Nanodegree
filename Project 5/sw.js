const staticCacheName = 'restaurant-app-v1';
const urlsToCache = [
	'/',
	'index.html',
	'restaurant.html',
	'/css/styles.css',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/data/restaurants.json',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/dbhelper.js'
];


/*
 * Creates a new cache called staticCacheName, then adds all URLs
 * from urlsToCache array to the newly created cache.
 */
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll(urlsToCache);
		})
	);
});


/*
 * Deletes any old existing cache.
 */
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheName => cacheName.startsWith('restaurant-') && cacheName !== staticCacheName)
				.map(cacheName => caches.delete(cacheName))
			)
		})
	);
});


/*
 * Intercept any requests made to the cache. If the cache does not return
 * a valid response, then the request is sent to the network. If the
 * resourses weren't in the cache to begin with, it is saved to the cache
 * so it will be available offline later.
 */
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request)
			.then(response => {
				return caches.open(staticCacheName)
				.then(cache => {
			    	cache.put(event.request.url, response.clone());
			    	return response;
  				});
			});
		})
	);
});