var width = 505;
var height = 606;

var go = false; // Toggle between start screen and game

// var allowedKeys = {
//    ..
//  }

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

Player.prototype.handleInput = function(keyCode){
    if (keyCode === 13) {
        go = !go;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = updateEnemySpot();

    this.width = 100;
    this.height = 150;

    this.startSpeed = updateEnemySpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

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
    
    ctx.clearRect(0, 0, width, height);
    this.x += this.startSpeed;

    if (this.x >= width) {
        this.x = 0;
        this.y = updateEnemySpot();
        this.startSpeed = updateEnemySpeed();
    }
    this.collisionCheckEnemy();
};

function updateEnemySpeed() {
    return Math.floor(Math.random() * 4) + 1;
}

function updateEnemySpot() {
    var random = Math.floor(Math.random() * 3) + 1;

    switch(random) {
        case 1:
            return 50;
            break;
        case 2:
            return 130;
            break;
        default:
            return 230;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};


var allEnemies = [
    new Enemy(),
    new Enemy()
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     player.handleInput(allowedKeys[e.keyCode]);
// });

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (player.y <= 0) {
        alert("GAME");
        player.playerReset();
    }

    if(e.keyCode == 39) {
        e.preventDefault();
        player.rightPressed = true;
        if (player.x >= width-100) {
            player.x -= 10;
        } else {
            player.x += 10;
        }
    }
    else if(e.keyCode == 37) {
        e.preventDefault();
        player.leftPressed = true;
        if (player.x <= 0) {
            player.x += 10;
        } else {
            player.x -= 10;
        }
    }
    else if(e.keyCode == 38) {
        e.preventDefault();
        player.upPressed = true;
        player.y -= 10;
    }
    else if(e.keyCode == 40) {
        e.preventDefault();
        player.downPressed = true;
        if (player.y >= height-200) {
            player.y -= 10;
        }
        else {
            player.y += 10;
        }
    } else if (e.keyCode == 13) {
        go = !go;
        console.log(go);
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        player.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        player.leftPressed = false;
    }
    else if(e.keyCode == 38) {
        player.upPressed = false;
    }
    else if(e.keyCode == 40) {
        player.downPressed = false;
    }
}
