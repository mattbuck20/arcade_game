// Enemies our player must avoid
var Enemy = function() {
    this.enemyPosY = [65, 145, 225, 300];
    this.enemySpeed = [300, 1000];
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

Enemy.prototype.reset = function() {
    
    this.x = -150;
    this.y = this.getLocationY();
    this.speed = this.getRandomSpeed();
};

Enemy.prototype.update = function(dt) {
    var maxPos = 600;
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getLocationY = function() {
    return this.enemyPosY[Math.floor(Math.random() * this.enemyPosY.length)];
};

Enemy.prototype.getRandomSpeed = function() {
     var minSpeed = this.enemySpeed[0],
         maxSpeed = this.enemySpeed[1];
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

var Player = function() {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        this.reset();
    } else if (this.y >= 60 && this.y <= 300) {
        var self = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y == self.y) {
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    self.reset();
                }
            }
        });
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': // x cannot be smaller than 0
            this.x -= (this.x - 101 < this.xRange[0]);
            break;
        case 'right': // y cannot be smaller than -40
            this.x += (this.x + 101 > this.xRange[1]); 
            break;
        case 'up': // x cannot be bigger than 404
            this.y -= (this.y - 80 < this.yRange[0]); 
            break;
        case 'down': // y cannot be bigger than 415
            this.y += (this.y + 80 > this.yRange[1]);
            break;
        default:
            console.log("wrong key for moving player");
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player();