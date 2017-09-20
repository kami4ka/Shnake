import Food from './food';
import Snake from './snake';

export default class Game {
    constructor(canvas, miner) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.gridSize = 20;
        this.tileCount = 40;
        this.hashes = 0;

        this.score = 0;
        this.highScore = 0;

        this.miner = miner;
        this.food = new Food();
        this.snake = new Snake(this.tileCount, miner);

        this.showNewGameScreen = false;
        this.interval = 1000/15;


         this.intervalFunction = () => {
             this.update();
             this.draw();
            setTimeout(this.intervalFunction, this.interval);
        };
        setTimeout(this.intervalFunction, this.interval);

    }

    update() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        this.snake.update();
        if (this.snake.foodInside === 0 && !this.food) {
            createFood(this);
            this.interval = 1000/15;
        }

        if (this.snake.foodInside > 0) {
            this.interval = 1000/45;
        }

        checkSnakeCollision(this);

        if (this.food) {
            checkFoodCollision(this);
        }
    }

    draw() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.showNewGameScreen) {
            this.context.fillStyle = 'blue';
            this.context.fillRect(this.snake.xHead * this.gridSize, this.snake.yHead * this.gridSize, this.gridSize - 2, this.gridSize - 2);

            this.context.fillStyle = this.snake.tailColor;
            this.snake.trail.forEach((segment) => {
                this.context.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            });

            if (this.food) {
                this.context.fillStyle = "red";
                this.context.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
            }

            drawScore(this);
        } else {
            this.context.font = "30px Comic Sans MS";
            this.context.fillStyle = "red";
            this.context.textAlign = "center";
            this.context.fillText('OUPS! Your score: ' + this.score + '. Click to try again.', this.canvas.width/2, this.canvas.height/2);
        }
    }

    keyPush(evt) {
        this.snake.updateDirection(evt);
    }

    click() {
        if (this.showNewGameScreen) {
            this.score = 0;
            this.showNewGameScreen = false;
            this.snake = new Snake(this.tileCount, this.miner);
            createFood(this);
        }
    }
}

function drawScore(gameObj) {
    gameObj.context.font = "30px Comic Sans MS";
    gameObj.context.fillStyle = "rgba(255, 255, 255, 0.5)";
    gameObj.context.textAlign = "right";
    gameObj.context.fillText('Score: ' + gameObj.score, gameObj.canvas.width - 30, 30);
    gameObj.context.textAlign = "left";
    gameObj.context.fillText('HighScore: ' + gameObj.highScore, 30, 30);
}

function checkSnakeCollision(gameObj) {
    gameObj.snake.trail.forEach((segment) => {
        if (segment.x === gameObj.snake.xHead && segment.y === gameObj.snake.yHead) {
            gameObj.showNewGameScreen = true;
        }
    });
}

function checkFoodCollision(gameObj) {
    if (gameObj.food.x === gameObj.snake.xHead && gameObj.food.y === gameObj.snake.yHead) {
        gameObj.snake.miner.start();
        gameObj.snake.foodInside = gameObj.food.energy * 10;
        gameObj.snake.tail+=gameObj.food.energy;
        gameObj.score+=gameObj.food.energy;
        gameObj.food = null;
    }
}

function createFood(gameObj) {
    let xFood = Math.floor(Math.random() * gameObj.tileCount);
    let yFood = Math.floor(Math.random() * gameObj.tileCount);

    gameObj.food = new Food(xFood, yFood, Math.floor(Math.random() * 5) + 1);
}