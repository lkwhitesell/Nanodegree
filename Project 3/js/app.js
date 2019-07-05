// Enemies our player must avoid
var Enemy = function(yPosition, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xPosition = -150;
    this.yPosition = yPosition;
    this.width = 75;
    this.height = 75;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPosition += dt*this.speed;

    // Reset enemy back to starting place once they reach end of screen
    // Randomize speed of enemy
    if(this.xPosition > 505) {
        this.xPosition = -500;
        this.speed = Math.floor(Math.random() * (600 - 100)/200) * 200 + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.xPosition = 200;
    this.yPosition = 400;
    this.width = 75;
    this.height = 75;
    this.score = 0;

};

Player.prototype.update = function() {
    // Check if player has won
    // Update player's score and position if they have won
    if(this.yPosition === -15) {
        this.yPosition = -14;
        this.score += 5;
        document.getElementById('score').textContent = this.score;

        setTimeout(function() {
            player.xPosition = 200;
            player.yPosition = 400;
        }, 500);
    }

    // Check for collision with enemies
    // Reset player position back to start if collision occurs
    for(let enemy of allEnemies) {
        if(this.xPosition < enemy.xPosition + enemy.width &&
            this.xPosition + this.width > enemy.xPosition &&
            this.yPosition < enemy.yPosition + enemy.height &&
            this.yPosition + this.height > enemy.yPosition) {
            this.xPosition = 200;
            this.yPosition = 400;

            if(this.score > 0) {
                this.score--;
            }

            document.getElementById('score').textContent = this.score;
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};
Player.prototype.handleInput = function(keyInput) {
    switch (keyInput) {
        case 'up':
            if(this.yPosition > 0) {
                this.yPosition -= 83;
            }
            break;

        case 'down':
            if(this.yPosition < 400) {
                this.yPosition += 83;
            }
            break;

        case 'left':
            if(this.xPosition > 0) {
                this.xPosition -= 101;
            }
            break;

        case 'right':
            if(this.xPosition < 400) {
                this.xPosition += 101;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let topLaneEnemy1 = new Enemy(61, 50);
let topLaneEnemy2 = new Enemy(61, 50);
let midLaneEnemy1 = new Enemy(151, 100);
let midLaneEnemy2 = new Enemy(151, 100);
let bottomLaneEnemy1 = new Enemy(231, 500);
let bottomLaneEnemy2 = new Enemy(231, 500);

let allEnemies = [
                    topLaneEnemy1, 
                    topLaneEnemy2, 
                    midLaneEnemy1, 
                    midLaneEnemy2, 
                    bottomLaneEnemy1, 
                    bottomLaneEnemy2
                ];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Reset score and player position when button is pressed
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
    player.xPosition = 200;
    player.yPosition = 400;
    player.score = 0;
    document.getElementById('score').textContent = player.score;
});