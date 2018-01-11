/* 
in een shape bepaalt een rij punten de vorm.
pos bepaalt de positie van de vorm.
de punten zijn relatief t.o.v. dit punt gedefinieerd.
*/

function Shape() {

    this.p = [];
    this.path = [];
    this.direction = createVector(0, 0);
    this.strokecolor = 0;
    this.fillcolor = 255;
    this.strokeweight = 1;
    this.center;

}
Shape.prototype.style = function(strokecolor, fillcolor, strokeweight) {
    if (strokecolor == undefined) {
        this.strokecolor = 0;
        stroke(0);
    } else if (strokecolor == null) {
        this.strokecolor = null;
        noStroke();
    } else {
        this.strokecolor = strokecolor;
        stroke(strokecolor);
    }
    if (fillcolor == undefined) {
        this.fillcolor = fillcolor;
        fill(0);
    } else if (fillcolor == null) {
        this.fillcolor = null;
        noFill();
    } else {
        this.fillcolor = fillcolor;
        fill(fillcolor);
    }
    if (strokeweight == undefined) {
        strokeWeight(1);
    } else {
        strokeWeight(strokeweight);
    }
}
Shape.prototype.createOnCircle = function(radius, list) {

    this.p = [];
    var i = 0;
    for (let l = 0; l < list.length; l++) {
        this.p[i] = createVector(0, 0);
        this.p[i].x = (radius / 2) * cos(list[l]);
        this.p[i].y = (radius / 2) * sin(list[l]);
        i++;
    }
    return this.p;
}
Shape.prototype.createOnEllipse = function(width, height, list) {

    this.p = [];
    var i = 0;
    for (let l = 0; l < list.length; l++) {
        this.p[i] = createVector(0, 0);
        this.p[i].x = (width / 2) * cos(list[l]);
        this.p[i].y = (height / 2) * sin(list[l]);
        i++;
    }
    return this.p;
}
Shape.prototype.moveTo = function(pos) {
    //niet gebruiken in combinatie met translate in draw
    this.pos = pos.copy();
    for (let i = 0; i < this.p.length; i++) {
        this.p[i].add(pos);
    }
    return this.p;
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

Shape.prototype.getPath = function() {
    //this.path = [];
    // this.path  = this.path.concat(this.p);
    //append(this.path, this.p[0]);
    return this.path;
}
Shape.prototype.draw = function() {
    var max = this.p.length;
    this.style(this.strokecolor, this.fillcolor, this.strokeweight);
    this.path = [];


    beginShape();
    if (max > 0) {
        for (var i = 0; i < max + 3; i++) {

            var index1 = (i - 1) % max
            if (i == 0) { index1 = max - 1; }
            var index2 = (i) % max
            var index3 = (i + 1) % max
            var index4 = (i + 2) % max
            for (let t = 0; t < 1; t += 0.2) {
                let x = curvePoint(this.p[index1].x, this.p[index2].x, this.p[index3].x, this.p[index4].x, t);
                let y = curvePoint(this.p[index1].y, this.p[index2].y, this.p[index3].y, this.p[index4].y, t);
                append(this.path, createVector(x, y));

            }
            curveVertex(this.p[i % max].x, this.p[i % max].y);
        }
        append(this.path, createVector(this.p[0].x, this.p[0].y));
    }

    endShape();



}