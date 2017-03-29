// Canvas width and height
var width = 505;
var height = 606;

var go = false; // Toggle between start screen and game


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = width/2 - 50;
    this.y = height - 200;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;
}

// Method to reset player position
Player.prototype.playerReset = function() {
    this.x = width/2 - 50;
    this.y = height - 200;
};


Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.keyDownHandler = function(e) {
    //Check if user reached end of map

    if (this.y <= 0) {
        alert("GAME");
        this.playerReset();
    }
    // Right press
    if(e.keyCode == 39) {
        e.preventDefault();
        this.rightPressed = true;
        if (this.x >= width-100) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }
    // Left press
    else if(e.keyCode == 37) {
        e.preventDefault();
        this.leftPressed = true;
        if (this.x <= 0) {
            this.x += 10;
        } else {
            this.x -= 10;
        }
    }
    // Up press
    else if(e.keyCode == 38) {
        e.preventDefault();
        this.upPressed = true;
        this.y -= 10;
    }
    // Down press
    else if(e.keyCode == 40) {
        e.preventDefault();
        this.downPressed = true;
        if (this.y >= height-200) {
            this.y -= 10;
        }
        else {
            this.y += 10;
        }
    }
}

Player.prototype.keyUpHandler = function(e){
    if(e.keyCode == 39) {
        this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        this.leftPressed = false;
    }
    else if(e.keyCode == 38) {
        this.upPressed = false;
    }
    else if(e.keyCode == 40) {
        this.downPressed = false;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

// Made custom keydown and keyup eventListeners
// Listens on player button press
document.addEventListener("keydown", function() {player.keyDownHandler(event) }, false);
document.addEventListener("keyup", function() {player.keyUpHandler(event) }, false);


//Enemy Class
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = Math.ceil(Math.random() * 3) * (150 - 80);

    this.width = 100;
    this.height = 150;

    this.speed = Math.ceil(Math.random() * 300) + 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Checks enemy collision resets position on contact
Enemy.prototype.collisionCheckEnemy = function() {
    if (Math.abs(player.x - this.x) < 60 && Math.abs(player.y - this.y) < 60) {
        console.log('collision detected');
        player.playerReset();
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //Clears the awkward path the enemy makes when leaving the screen
    ctx.clearRect(0, 0, width, height);

    this.x += this.speed * dt;

    if (this.x >= width) {
        this.x = -100;
        this.y = Math.ceil(Math.random() * 3) * (150 - 80);
        this.speed = Math.ceil(Math.random() * 300) + 100;
    }

    this.collisionCheckEnemy();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};


var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];
