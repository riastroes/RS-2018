function Spot(pos, acolor, size) {
    this.color = acolor;
    this.size = size;
    this.pos = pos;
}
Spot.prototype.draw = function() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
}