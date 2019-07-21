const Cat = function(name, image) {
	this.name = name;
	this.image = image;
	this.clickCounter = 0;
}

Cat.prototype.createElement = function() {
	const newCat = document.createElement('div');
	newCat.className = 'cat hidden';
	newCat.id = this.name;
	
	const catName = document.createElement('p');
	catName.className = 'catName';
	catName.textContent = this.name;
	newCat.appendChild(catName);
	
	const catClickCounter = document.createElement('p');
	catClickCounter.className = 'click-counter';
	catClickCounter.textContent = 'Number of clicks: ' + this.clickCounter;
	newCat.appendChild(catClickCounter);

	const catImage = document.createElement('img');
	catImage.className = 'images';
	catImage.src = this.image;
	catImage.addEventListener('click', () => this.catImageClicked());
	newCat.appendChild(catImage);

	document.querySelector('#catDisplayArea').appendChild(newCat);
};

Cat.prototype.addToList = function() {
	const newListItem = document.createElement('li');
	newListItem.className = 'cat-option';
	newListItem.textContent = this.name;

	document.querySelector('#catMenu ul').appendChild(newListItem);
};

Cat.prototype.catImageClicked = function() {
	this.clickCounter += 1;
	const elementQuery = '#' + this.name + ' .click-counter';
	document.querySelector(elementQuery).textContent = 'Number of clicks: ' + this.clickCounter;
};

const cats = [
	new Cat('Muffin', 'images/cat-gray.jpeg'),
	new Cat('Thor', 'images/cat-siamese.jpeg'),
	new Cat('Potato', 'images/cat-tabby-yawning.jpeg'),
	new Cat('Spooky Boy', 'images/cat-black.jpeg'),
	new Cat('Tiger', 'images/cat-stripped.jpeg')
];

for(const cat of cats) {
	cat.createElement();
	cat.addToList();
}

const catsInMenu = document.getElementsByClassName('cat-option');

for(const catInMenu of catsInMenu) {
	catInMenu.addEventListener('click', displayCat);
}

function displayCat() {
	const catDivs = document.getElementsByClassName('cat');

	for(const catDiv of catDivs) {
		if(catDiv.id === this.textContent) {
			catDiv.classList.remove('hidden');
		}

		if (catDiv.id !== this.textContent && !catDiv.classList.contains('hidden')) {
			catDiv.classList.add('hidden');
		}
	}	
}















