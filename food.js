class Food {
  food = [];
  max = 3;
  foodLength = 0;
  target;
  constructor() {
  }

  drop(pos) {
    if (this.foodLength < this.max) this.food.push(pos);
    this.foodLength = this.food.length;
    this.updateTarget(snake.head);
  }

  eat(pos) {
    for (let i = 0; i < this.foodLength; i++)
      if (this.food[i].x === pos.x && this.food[i].y === pos.y){
        this.food.splice(i, 1);
        this.foodLength = this.food.length;
        this.updateTarget(snake.head);
        return true;
      }
    this.foodLength = this.food.length;
    this.updateTarget(snake.head);
    return false;
  }

  updateTarget(head){
    let foodDist;
    for (let i = 0; i < this.foodLength; i++){
      let thisDist = dist(head.x, this.food[i].x, head.y, this.food[i].y);
      if (thisDist < foodDist || !foodDist){
        foodDist = thisDist;
        this.target = this.food[i];
      }
    }
  }

  getQuantitiy() {
    return this.foodLength;
  }

  show() {
    fill("#000000");
    stroke("#fafafa");

    for (let i = 0; i < this.foodLength; i++)
      rect(this.food[i].x, this.food[i].y, scale, scale);
  }
}
