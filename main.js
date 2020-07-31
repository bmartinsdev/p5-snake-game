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
    y: wHeight - 50
  },
  current: 0,
  max: 0
};
let keyDown = false;
let currentFPS = 10;

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(currentFPS);
  food = new Food();
  snake = new Snake();
}

function update(){
  if (snake.intersectsSelf()){
    if(snake.getScore() > score.max) score.max = snake.getScore();
    currentFPS = 10;
    snake = new Snake();
  }
  if(food.eat(snake.head)) snake.grow();
  score.current = snake.getScore();
  this.speedUp();
  if (food.getQuantitiy() === 0) food.drop(this.getEmptyPos());
}

function draw() {
  this.update();
  background("#fafafa");
  food.show();
  snake.update();
  snake.show();
  this.keyDown = false;
  textFont('Arial');
  textAlign(RIGHT);
  fill("#999999");
  textSize(11);
  text('SCORE', score.pos.x + 50, score.pos.y);
  text('BEST', score.pos.x + 160, score.pos.y);
  fill("#000000");
  textSize(14);
  text(score.current, score.pos.x + 50, score.pos.y + 20);
  text(score.max, score.pos.x + 160, score.pos.y + 20);
}

function keyPressed() {
  if(this.keyDown) return;
  switch (key) {
    case 'ArrowUp':
    case 'w':
      if (snake.direction !== "down") snake.changeDirection("up");
      break;
    case 'ArrowDown':
    case 's':
      if (snake.direction !== "up") snake.changeDirection("down");
      break;
    case 'ArrowRight':
    case 'd':
      if (snake.direction !== "left") snake.changeDirection("right");
      break;
    case 'ArrowLeft':
    case 'a':
      if (snake.direction !== "right") snake.changeDirection("left");
      break;
  }
  this.keyDown = true;
}

function speedUp(){
  if(snake.tailLength < 20 && currentFPS == 10 || currentFPS == 20){
    return;
  } else if(currentFPS == 10 && snake.tailLength > 20){
    currentFPS = 12;
    frameRate(currentFPS);
  } else if(currentFPS == 12 && snake.tailLength > 40){
    currentFPS = 14;
    frameRate(currentFPS);
  } else if(currentFPS == 14 && snake.tailLength > 60){
    currentFPS = 16;
    frameRate(currentFPS);
  } else if(currentFPS == 16 && snake.tailLength > 80){
    currentFPS = 18;
    frameRate(currentFPS);
  } else if(currentFPS == 18 && snake.tailLength > 100){
    currentFPS = 20;
    frameRate(currentFPS);
  }
}

function getEmptyPos(){
  let location = createVector(floor(random(cols)), floor(random(rows)));
  location.mult(scale);

  while(snake.intersects(location)){
    location = createVector(floor(random(cols)), floor(random(rows)));
    location.mult(scale);
  }
    
  return location;
}
