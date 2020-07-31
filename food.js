class Food {
  food = [];
  max = 3;
  constructor() {
  }

  drop(pos) {
    if (this.food.length < this.max) this.food.push(pos);
  }

  eat(pos) {
    for (let i = 0; i < this.food.length; i++)
      if (this.food[i].x === pos.x && this.food[i].y === pos.y){
        this.food.splice(i, 1);
        return true;
      }
    return false;
  }

  getQuantitiy() {
    return this.food.length;
  }

  show() {
    fill("#000000");
    stroke("#fafafa");

    for (let i = 0; i < this.food.length; i++)
      rect(this.food[i].x, this.food[i].y, scale, scale);
  }
}
