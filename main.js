let canvas;
let snake;
let scale = 24;
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

function setup() {
  createCanvas(wWidth, wHeight);
  frameRate(10);
  snake = new Snake();
}

function dropFood(){
  let cols = floor(wWidth / scale);
  let rows = floor(wHeight / scale);
}

function keyPressed() {
  switch(keyCode){
    case UP_ARROW:
      if(snake.direction !== 'down')
        snake.changeDirection('up');
      break;
    case DOWN_ARROW:
      if(snake.direction !== 'up')
        snake.changeDirection('down');
      break;
    case RIGHT_ARROW:
      if(snake.direction !== 'left')
        snake.changeDirection('right');
      break;
    case LEFT_ARROW:
      if(snake.direction !== 'right')
        snake.changeDirection('left');
      break;
  }
}

function draw() {
  background("#fafafa");
  snake.update();
  snake.show();
}
