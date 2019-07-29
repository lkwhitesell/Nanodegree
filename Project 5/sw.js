const staticCacheName = 'restaurant-app-v4';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/Project 5/',
				'/Project 5/index.html',
				'/Project 5/restaurant.html',
				'/Project 5/css/styles.css',
				'/Project 5/img/1.jpg',
				'/Project 5/img/2.jpg',
				'/Project 5/img/3.jpg',
				'/Project 5/img/4.jpg',
				'/Project 5/img/5.jpg',
				'/Project 5/img/6.jpg',
				'/Project 5/img/7.jpg',
				'/Project 5/img/8.jpg',
				'/Project 5/img/9.jpg',
				'/Project 5/img/10.jpg',
				'/Project 5/data/restaurants.json',
				'/Project 5/js/main.js',
				'/Project 5/js/restaurant_info.js',
				'/Project 5/js/dbhelper.js'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
							cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			)
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) {
				return response;
			}
			return fetch(event.request)
			.then(response => {
				if(response.status === 404) {
					return new Response('opps. not found.');
				}
				return caches.open(staticCacheName)
				.then(cache => {
			    	cache.put(event.request.url, response.clone());
			    	return response;
  				});
			});
		})
	);
});