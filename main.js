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
}

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(10);
  food = new Food();
  snake = new Snake();
}

function update(){
  if (snake.intersectsSelf()){
    if(snake.getSize() < score.max) score.max = snake.getSize();
    snake = new Snake();
  }
  if(food.eat(snake.head)) snake.grow();
  score.current = snake.getSize();
  if (food.getQuantitiy() === 0) food.drop(this.getEmptyPos());
}

function draw() {
  this.update();
  background("#fafafa");
  food.show();
  snake.update();
  snake.show();
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
