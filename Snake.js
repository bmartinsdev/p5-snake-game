class Snake {
  speed = 1;
  direction = 'left';
  tail = [];
  head = {};
  length = 5;
  constructor() {
    this.head = createVector(floor(wWidth / 2), floor(wHeight / 2));
    for(let i=0; i<5; i++){
      this.tail[i] = createVector(this.head.x, this.head.y);
      this.tail[i].x = this.tail[i].x + (i + 1) * scale ;
    }
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.move();
    this.tail[this.length - 1] = createVector(this.head.x, this.head.y);
  }

  move(){
    switch(this.direction){
      case 'up':
        this.head.y = this.head.y - this.speed * scale;
        break;
      case 'down':
        this.head.y = this.head.y + this.speed * scale;
        break;
      case 'left':
        this.head.x = this.head.x - this.speed * scale;
        break;
      case 'right':
        this.head.x = this.head.x + this.speed * scale;
        break;
    }
    this.head.x = constrain(this.head.x, 0, wWidth - scale);
    this.head.y = constrain(this.head.y, 0, wHeight - scale);
  }

  changeDirection(dir){
    this.direction = dir;
  }
  
  show() {
    fill("#ccc");
    stroke("#fafafa");
    for(let i = 0; i< this.tail.length; i++)
      rect(this.tail[i].x, this.tail[i].y, scale, scale);
    rect(this.head.x, this.head.y, scale, scale);
  }
}
