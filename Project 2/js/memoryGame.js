const cards = document.getElementsByClassName('card');
const cardBacks = document.getElementsByClassName('back');
const imageClasses = [	'fa-leaf', 'fa-leaf', 'fa-wrench', 'fa-wrench', 'fa-scissors', 'fa-scissors', 
						'fa-puzzle-piece', 'fa-puzzle-piece', 'fa-paperclip', 'fa-paperclip', 'fa-rocket', 'fa-rocket', 
						'fa-bug', 'fa-bug', 'fa-diamond', 'fa-diamond'];

for(const card of cards) {
	card.addEventListener('click', cardClicked);
}

initCards();

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);

const playAgainButton = document.getElementById('playAgain');
playAgainButton.addEventListener('click', function() {
	resetGame();
	const modal = document.getElementById('winningModal');
	modal.style.display = 'none';
	startTimer();
})

let numOfMoves = 0;
let numOfMatches = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerStr = '';
const timer = document.getElementById('timer');
let timerId;
const starRating = document.getElementById('starRating');
let numOfStars = 3;

startTimer();

function startTimer() {
	timerId = setTimeout(incrementTimer, 1000);
}

function incrementTimer() {
	seconds++;

	if(seconds > 59) {
		if(minutes >59) {
			hours++;
			minutes = 0;
		}

		minutes++;
		seconds = 0;
	}

	timerStr = ((hours < 10) ? '0' + hours : hours) 
						+ ((minutes < 10) ? ':0' + minutes : ':' + minutes) 
						+ ((seconds < 10) ? ':0' + seconds : ':' + seconds);

	timer.textContent = timerStr;
	startTimer();
}

let clickedCard = [];
function cardClicked() {
	this.classList.add('flipped');
	this.style.pointerEvents = 'none';
	clickedCard.push(this);

	// Check how many cards have been clicked
	if(clickedCard.length === 2) {
		document.getElementById('moveCounter').textContent = ++numOfMoves + ' Moves';

		const firstCard = clickedCard[0];
		const secondCard = clickedCard[1];

		// When 2 cards have been clicked, verify if they match
		if(firstCard.children[1].classList.toString() === secondCard.children[1].classList.toString()) {
			numOfMatches+=1;
			setTimeout(function() {
				firstCard.children[1].classList.add('match');
				secondCard.children[1].classList.add('match');
			}, 1000);
		}
		else {
			setTimeout(function() {
				firstCard.classList.remove('flipped');
				secondCard.classList.remove('flipped');

				firstCard.style.pointerEvents = 'auto';
				secondCard.style.pointerEvents = 'auto';
			}, 1000);
		}
		clickedCard.length = 0;

		setStarRating();
	}

	// Verify if all cards have been matched
	if(numOfMatches == cards.length/2) {
		setTimeout(gameWon, 1500);
	}
}

function setStarRating() {
	if(numOfMoves > 12) {
		numOfStars = 2;
		starRating.innerHTML = `<span class="fa fa-star"></span>
									<span class="fa fa-star"></span>
									<span class="fa fa-star-o"></span>`;		
	}

	if(numOfMoves > 16) {
		numOfStars = 1;
		starRating.innerHTML = `<span class="fa fa-star"></span>
									<span class="fa fa-star-o"></span>
									<span class="fa fa-star-o"></span>`;
	}

	if(numOfMoves > 20) {
		numOfStars = 0;
		starRating.innerHTML = `<span class="fa fa-star-o"></span>
									<span class="fa fa-star-o"></span>
									<span class="fa fa-star-o"></span>`;
	}
}

// Udacity provided shuffle function
function shuffle(arr) {
	var currentIndex = arr.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}

	return arr;
}

// Shuffle images and apply to cards
function initCards() {
	shuffle(imageClasses);

	let index = 0;
	for(const cardBack of cardBacks) {
		cardBack.classList.add(imageClasses[index]);
		index += 1;
	}
}

function resetGame() {
	resetValues();

	// Make cards clickable and unflip any cards that are flipped
	for(const card of cards) {
		card.style.pointerEvents = 'auto';

		if(card.classList.contains('flipped')) {
			card.classList.remove('flipped');
		}
	}

	/* 
		After cards complete unflip:

		1. Remove styling of cards previously matched
		2. Remove images from all cards
		3. Initialize next game
	*/
	setTimeout(function() {
		let i = 0;
		for(const cardBack of cardBacks) {
			if(cardBack.classList.contains('match')) {
				cardBack.classList.remove('match');

			}

			cardBack.classList.remove(imageClasses[i]);
			i += 1;
		}

		initCards();
	}, 1000)

	
}

function resetValues() {
	// Reset timer
	seconds = 0;
	minutes = 0;
	hours = 0;
	timer.textContent = '00:00:00';

	// Reset moves counter
	numOfMoves = 0;
	document.getElementById('moveCounter').textContent = "0 Moves";

	// Reset star rating
	numOfStars = 3;
	starRating.innerHTML = `<span class="fa fa-star"></span>
							<span class="fa fa-star"></span>
							<span class="fa fa-star"></span>`;

	// Reset game logic variables
	clickedCard.length = 0;
	numOfMatches = 0;
}

function gameWon() {
	clearTimeout(timerId);
	const modal = document.getElementById('winningModal');
	const winningText = document.getElementById('winningText');

	modal.style.display = 'flex';
	winningText.innerHTML = `In <em>${timerStr}</em> time, with <em>${numOfMoves}</em> moves and <em>${numOfStars}</em> stars.`
}



