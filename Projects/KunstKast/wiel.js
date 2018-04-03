function Wiel() {
    this.image = images[2];
    this.handel = images[3];
    this.angle = PI / 2;
    this.speed = 0.1;

}
Wiel.prototype.draw = function(x, y) {
    imageMode(CENTER);
    push();
    translate(x, y);
    rotate(this.angle + this.speed);
    image(this.image, 0, 0);
    pop();
    push();
    translate(x, y);
    rotate(this.angle);
    image(this.handel, 0, 20);
    pop();
    imageMode(CORNER);
    this.speed -= 0.05;
}