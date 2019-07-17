const muffin = document.querySelector('#muffinCat .images');
const thor = document.querySelector('#thorCat .images');

let muffinCounterLabel = document.getElementById('muffinCounter');
let thorCounterLabel = document.getElementById('thorCounter');

let muffinClickCounter = 0;
let thorClickCounter = 0;

muffin.addEventListener('click', function() {
	muffinClickCounter += 1;
	muffinCounterLabel.innerText = muffinClickCounter;
});

thor.addEventListener('click', function() {
	thorClickCounter += 1;
	thorCounterLabel.innerText = thorClickCounter;
});