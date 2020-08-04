const debug = false;
let canvas;
let snake;
let food;
let scale = 24;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let cols = Math.floor(wWidth / scale);
let rows = Math.floor(wHeight / scale);
let score = {
  pos: {
    x: wWidth - 200,
    y: wHeight - 50,
  },
  current: 0,
  max: 0,
};
let keyDown = false;
let currentFPS = 10;
let pathFinding = 2;
let resetGame = false;
let directions = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

function setup() {
  score.max = localStorage.getItem('lugh-snake-score') || 0;
  createCanvas(wWidth, wHeight);
  frameRate(currentFPS);
  if (debug) frameRate(60);
  food = new Food();
  snake = new Snake();
}

function update() {
  if (snake.intersectsSelf() && snake.tailLength > snake.size) {
    snake.dead = true;
  } else {
    if (food.eat(snake.head)) {
      snake.grow();
    }
    score.current = snake.getScore();
    if (!debug) this.speedUp();
    if (food.getQuantitiy() === 0) food.drop(this.getEmptyPos());
  }
  if (pathFinding) this.pathFinder();
  if (!snake.dead) {
    snake.update();
  } else {
    if (!resetGame) {
      resetGame = true;
      setTimeout(function () {
        if (snake.getScore() > score.max) {
          score.max = snake.getScore();
          localStorage.setItem('lugh-snake-score', score.max);
        }
        currentFPS = 10;
        pathFinding = 2;
        resetGame = false;
        snake = new Snake();
        food = new Food();
      }, 3000);
    }
  }
}

function draw() {
  this.update();
  background('#fafafa');
  food.show();
  snake.show();
  keyDown = false;
  textFont('Arial');
  textAlign(RIGHT);
  noStroke();
  fill('#777777');
  textSize(11);
  text('SCORE', score.pos.x + 50, score.pos.y);
  text('BEST', score.pos.x + 160, score.pos.y);
  fill('#000000');
  textSize(14);
  text(score.current, score.pos.x + 50, score.pos.y + 20);
  text(score.max, score.pos.x + 160, score.pos.y + 20);
}

function pathFinder() {
  switch (pathFinding) {
    case 1:
      shortestPath();
      break;
    case 2:
      straightLines();
      break;
  }
}

function shortestPath() {
  if (!food.target) return;
  switch (snake.direction) {
    case 'up':
      if (snake.head.x < food.target.x) {
        this.tryMove('right');
      } else if (snake.head.x > food.target.x) {
        this.tryMove('left');
      } else if (
        snake.head.x === food.target.x &&
        snake.head.y < food.target.y
      ) {
        this.tryMove('right');
      } else if (snake.head.y === food.target.y) {
        if (snake.head.x < food.target.x) {
          this.tryMove('left');
        } else if (snake.head.x > food.target.x) {
          this.tryMove('right');
        }
      } else {
        this.tryMove(snake.direction);
      }
      break;
    case 'down':
      if (snake.head.x > food.target.x) {
        this.tryMove('left');
      } else if (snake.head.x < food.target.x) {
        this.tryMove('right');
      } else if (
        snake.head.x === food.target.x &&
        snake.head.y > food.target.y
      ) {
        this.tryMove('right');
      } else if (snake.head.y === food.target.y) {
        if (snake.head.x > food.target.x) {
          this.tryMove('left');
        } else if (snake.head.x < food.target.x) {
          this.tryMove('right');
        }
      } else {
        this.tryMove(snake.direction);
      }
      break;
    case 'left':
      if (snake.head.y < food.target.y) {
        this.tryMove('down');
      } else if (snake.head.y > food.target.y) {
        this.tryMove('up');
      } else if (
        snake.head.y === food.target.y &&
        snake.head.x < food.target.x
      ) {
        this.tryMove('up');
      } else if (snake.head.x === food.target.x) {
        if (snake.head.y < food.target.y) {
          this.tryMove('down');
        } else if (snake.head.y > food.target.y) {
          this.tryMove('up');
        }
      } else {
        this.tryMove(snake.direction);
      }
      break;
    case 'right':
      if (snake.head.y > food.target.y) {
        this.tryMove('up');
      } else if (snake.head.y < food.target.y) {
        this.tryMove('down');
      } else if (
        snake.head.y === food.target.y &&
        snake.head.x > food.target.x
      ) {
        this.tryMove('up');
      } else if (snake.head.x === food.target.x) {
        if (snake.head.y < food.target.y) {
          this.tryMove('down');
        } else if (snake.head.y > food.target.y) {
          this.tryMove('up');
        }
      } else {
        this.tryMove(snake.direction);
      }
      break;
  }
}

function straightLines() {
  if (!food.target) return;
  switch (snake.direction) {
    case 'up':
      if(snake.head.y > food.target.y){
        this.tryMove('up');
      } else if(snake.head.y < food.target.y || snake.head.y === food.target.y){
        if (snake.head.x <= food.target.x) {
          this.tryMove('right');
        } else {
          this.tryMove('left');
        }
      }
      break;
    case 'down':
      if(snake.head.y < food.target.y){
        this.tryMove('down');
      } else if(snake.head.y > food.target.y || snake.head.y === food.target.y){
        if (snake.head.x <= food.target.x) {
          this.tryMove('right');
        } else {
          this.tryMove('left');
        }
      }
      break;
    case 'left':
      if(snake.head.x > food.target.x){
        this.tryMove('left');
      } else if(snake.head.x < food.target.x || snake.head.x === food.target.x){
        if (snake.head.y >= food.target.y) {
          this.tryMove('up');
        } else {
          this.tryMove('down');
        }
      }
      break;
    case 'right':
      if(snake.head.x < food.target.x){
        this.tryMove('right');
      } else if(snake.head.x > food.target.x || snake.head.x === food.target.x){
        if (snake.head.y >= food.target.y) {
          this.tryMove('up');
        } else {
          this.tryMove('down');
        }
      }
      break;
  }
}

function mousePressed() {
  let pos = createVector(
    floor(mouseX / scale) * scale,
    floor(mouseY / scale) * scale
  );
  if(!snake.intersects(pos) && !this.outOfBoundaries(pos)) food.drop(pos);
}

function keyPressed() {
  this.move(key);
  pathFinding = 0;
}

function tryMove(key) {
  let paths = [key];

  for (let [dir, opp] of Object.entries(directions)) {
    if (dir !== key && dir !== directions[snake.direction]) paths.push(dir);
  }

  for (let dir of paths) {
    let head = snake.head.copy();
    snake.move(head, dir);
    if (!snake.intersects(head)) {
      snake.move(head, dir);
      if (!snake.intersects(head)) {
        key = dir;
        break;
      }
      key = dir;
    }
  }
  this.move(key);
}

function move(key) {
  if (keyDown) return;
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'up':
      if (snake.direction !== 'down') snake.changeDirection('up');
      break;
    case 'ArrowDown':
    case 's':
    case 'down':
      if (snake.direction !== 'up') snake.changeDirection('down');
      break;
    case 'ArrowRight':
    case 'd':
    case 'right':
      if (snake.direction !== 'left') snake.changeDirection('right');
      break;
    case 'ArrowLeft':
    case 'a':
    case 'left':
      if (snake.direction !== 'right') snake.changeDirection('left');
      break;
  }
  keyDown = true;
}

function speedUp() {
  if (snake.tailLength < 20 && (currentFPS == 10 || currentFPS == 20)) {
    return;
  } else if (currentFPS == 10 && snake.tailLength > 20) {
    currentFPS = 12;
    frameRate(currentFPS);
  } else if (currentFPS == 12 && snake.tailLength > 40) {
    currentFPS = 14;
    frameRate(currentFPS);
  } else if (currentFPS == 14 && snake.tailLength > 60) {
    currentFPS = 16;
    frameRate(currentFPS);
  } else if (currentFPS == 16 && snake.tailLength > 80) {
    currentFPS = 18;
    frameRate(currentFPS);
  } else if (currentFPS == 18 && snake.tailLength > 100) {
    currentFPS = 20;
    frameRate(currentFPS);
  }
}

function outOfBoundaries(pos){
  return pos.x < 0 || pos.y < 0 || pos.x > wWidth - scale || pos.y > wHeight - scale;
}

function getEmptyPos() {
  let location = createVector(
    floor(random(cols)) * scale,
    floor(random(rows)) * scale
  );

  while (snake.intersects(location)) {
    location = createVector(
      floor(random(cols)) * scale,
      floor(random(rows)) * scale
    );
  }

  return location;
}
