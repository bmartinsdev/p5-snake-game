class Food {
  food = [];
  max = 3;
  constructor() {
  }

  drop(pos) {
    if (this.food.length < this.max) this.food.push(pos);
  }

  eat() {}


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
