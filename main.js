let canvas;
let snake;
let food;
let scale = 24;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
let cols = Math.floor(wWidth / scale);
let rows = Math.floor(wHeight / scale);

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(10);
  food = new Food();
  snake = new Snake();
}

function draw() {
  if (food.getQuantitiy() === 0) food.drop(this.getEmptyPos());
  background("#fafafa");
  snake.update();
  snake.show();
  food.show();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (snake.direction !== "down") snake.changeDirection("up");
      break;
    case DOWN_ARROW:
      if (snake.direction !== "up") snake.changeDirection("down");
      break;
    case RIGHT_ARROW:
      if (snake.direction !== "left") snake.changeDirection("right");
      break;
    case LEFT_ARROW:
      if (snake.direction !== "right") snake.changeDirection("left");
      break;
  }
}

function getEmptyPos(){
  let location = createVector(floor(random(cols)), floor(random(rows)));
  
  while(snake.intersects(location))
    location = createVector(floor(random(cols)), floor(random(rows)));
    
  return location;
}
