/* 
in een shape bepaalt een rij punten de vorm.
pos bepaalt de positie van de vorm.
de punten zijn relatief t.o.v. dit punt gedefinieerd.
*/

function Shape(pos, acolor) {
    this.pos = pos.copy();
    this.p = [];
    this.color = acolor;
    this.direction = createVector(0, 0);

}
Shape.prototype.createOnCircle = function(size) {
    this.p = [];
    var i = 0;
    for (var angle = 0; angle <= TWO_PI; angle += (TWO_PI / size)) {
        this.p[i] = createVector(0, 0);
        this.p[i].x = (size / 2) * cos(angle);
        this.p[i].y = (size / 2) * sin(angle);
        i++;
    }
}
Shape.prototype.changeDirection = function() {
    if (this.pos.x > width) {
        this.direction.x = random(-1, 0);
    } else if (this.pos.x < 0) {
        this.direction.x = random(0, 1);
    } else {
        this.direction.x = random(-1, 1);
    }
    if (this.pos.y > height) {
        this.direction.y = random(-1, 0);
    } else if (this.pos.y < 0) {
        this.direction.y = random(0, 1);
    } else {
        this.direction.y = random(-1, 1);
    }

}
Shape.prototype.move = function(speed) {
    var move = this.direction.copy();
    move.mult(speed);
    this.pos.add(move);

}
Shape.prototype.change = function(factor) {
    for (var i = 0; i < this.p.length; i++) {
        this.p[i].x += random(-factor, factor);
        this.p[i].y += random(-factor, factor);
    }
}
Shape.prototype.draw = function(pos) {
    var max = this.p.length;
    stroke(0);
    fill(this.color);
    strokeWeight(1);
    push();
    translate(pos.x, pos.y);

    beginShape();
    for (var i = 0; i < max + 4; i++) {
        curveVertex(this.p[i % max].x, this.p[i % max].y);
    }
    endShape();
    pop();

}