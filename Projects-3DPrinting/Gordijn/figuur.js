//mens.js

function Figuur() {
    this.path = [];
    this.neck = createVector(random(250, width - 250), 200);
    this.rhand = createVector(random(width / 2, width - 50), random(50, height / 2));
    this.lhand = createVector(random(50, width / 2), random(50, height / 2));
    this.roksel = createVector(this.neck.x + 50, this.neck.y + 50);
    this.loksel = createVector(this.neck.x - 50, this.neck.y + 50);
    this.rtaile = createVector(this.neck.x + random(30, 80), height / 2);
    this.ltaile = createVector(this.neck.x - random(30, 80), height / 2);

    this.rvoet = createVector(random(width / 2, width - 50), height - 50);
    this.lvoet = createVector(random(50, width / 2), height - 50);
    this.rknie = createVector(random(width / 2, width - 50), random(height / 2, height / 3 * 2));
    this.lknie = createVector(random(50, width / 2), random(height / 2, height / 3 * 2));
    this.kruis = createVector(this.neck.x, 600);
    this.control1 = createVector(500, -500);
    this.control2 = createVector(width, height);
    this.control3 = createVector(-width, height);




}

Figuur.prototype.structure = function() {
    stroke(255, 0, 0);
    strokeWeight(5);
    noFill();
    point(this.neck.x, this.neck.y);
    stroke(0);
    strokeWeight(2);
    noFill();

    ellipse(this.neck.x, this.neck.y - 35, 75, 90);

    //beginShape();
    curve(this.control1.x, this.control1.y, this.neck.x, this.neck.y, this.rhand.x, this.rhand.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.rhand.x, this.rhand.y, this.roksel.x, this.roksel.y, this.control1.x, this.control1.y);
    curve(this.control2.x, this.control2.y, this.roksel.x, this.roksel.y, this.rtaile.x, this.rtaile.y, this.control2.x, this.control2.y);
    curve(this.control1.x, this.control1.y, this.rtaile.x, this.rtaile.y, this.rknie.x, this.rknie.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.rknie.x, this.rknie.y, this.rvoet.x, this.rvoet.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.rvoet.x, this.rvoet.y, this.rknie.x - 30, this.rknie.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.rknie.x - 30, this.rknie.y, this.kruis.x, this.kruis.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.kruis.x, this.kruis.y, this.lvoet.x, this.lvoet.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.lvoet.x, this.lvoet.y, this.ltaile.x, this.ltaile.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.lvoet.x, this.lvoet.y, this.ltaile.x, this.ltaile.y, this.control1.x, this.control1.y);
    curve(this.control3.x, this.control1.y, this.ltaile.x, this.ltaile.y, this.loksel.x, this.loksel.y, this.control1.x, this.control3.y);
    curve(this.control1.x, this.control1.y, this.loksel.x, this.loksel.y, this.lhand.x, this.lhand.y, this.control1.x, this.control1.y);
    curve(this.control1.x, this.control1.y, this.lhand.x, this.lhand.y, this.neck.x, this.neck.y, this.control1.x, this.control1.y);

    //endShape();

}

Figuur.prototype.draw = function() {
    stroke(0);
    strokeWeight(1);
    noFill();
    var s = 3
    for (var s = 0; s < 20; s += 3) {


        triangle(this.neck.x, this.neck.y, this.neck.x - random(50, 70), this.neck.y - random(50, 100), this.neck.x + random(50, 70), this.neck.y - random(50, 100))
        triangle(this.neck.x, this.neck.y - s, this.neck.x - random(50, 70), this.neck.y - random(50, 100), this.neck.x + random(50, 70), this.neck.y - random(50, 100))

        curve(this.control1.x, this.control1.y, this.neck.x, this.neck.y + s, this.rhand.x - s, this.rhand.y + s, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.rhand.x - s, this.rhand.y + s, this.roksel.x - s, this.roksel.y + s, this.control1.x, this.control1.y);
        curve(this.control2.x, this.control2.y, this.roksel.x - s, this.roksel.y + s, this.rtaile.x - s, this.rtaile.y, this.control2.x, this.control2.y);
        curve(this.control1.x, this.control1.y, this.rtaile.x - s, this.rtaile.y, this.rvoet.x - s, this.rvoet.y - s, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.rvoet.x - s, this.rvoet.y - s, this.kruis.x, this.kruis.y - s, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.kruis.x, this.kruis.y - s, this.lvoet.x + s, this.lvoet.y - s, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.lvoet.x + s, this.lvoet.y - s, this.ltaile.x + s, this.ltaile.y, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.lvoet.x + s, this.lvoet.y - s, this.ltaile.x + s, this.ltaile.y, this.control1.x, this.control1.y);
        curve(this.control3.x, this.control1.y, this.ltaile.x + s, this.ltaile.y, this.loksel.x - s, this.loksel.y + s, this.control1.x, this.control3.y);
        curve(this.control1.x, this.control1.y, this.loksel.x + s, this.loksel.y + s, this.lhand.x + s, this.lhand.y + s, this.control1.x, this.control1.y);
        curve(this.control1.x, this.control1.y, this.lhand.x + s, this.lhand.y + s, this.neck.x, this.neck.y + s, this.control1.x, this.control1.y);
    }



}
Figuur.prototype.print = function(i) {
    stroke(0);
    strokeWeight(1);
    noFill();
    var s = 3;
    var cx, cy;

    var s = 3 * i;
    var z = createVector(0,0,(s/3) * 0.4);

    append(this.path, this.neck.add(z));
    append(this.path, createVector(this.neck.x - random(50, 70), this.neck.y - random(50, 100)).add(z));
    append(this.path, createVector(this.neck.x + random(50, 70), this.neck.y - random(50, 100)).add(z));
    append(this.path, this.neck.add(z));


    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.neck.x + s, this.rhand.x - s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.neck.y, this.rhand.y + s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.rhand.x - s, this.roksel.x - s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.rhand.y + s, this.roksel.y + s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control2.x, this.roksel.x - s, this.rtaile.x - s, this.control2.x, t);
        cy = curvePoint(this.control2.y, this.roksel.y + s, this.rtaile.y, this.control2.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.rtaile.x - s, this.rvoet.x - s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.rtaile.y, this.rvoet.y - s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.rvoet.x - s, this.kruis.x + s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.rvoet.y - s, this.kruis.y - s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.kruis.x + s, this.lvoet.x + s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.kruis.y - s, this.lvoet.y - s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.lvoet.x + s, this.ltaile.x + s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.lvoet.y - s, this.ltaile.y, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control3.x, this.ltaile.x + s, this.loksel.x + s, this.control3.x, t);
        cy = curvePoint(this.control3.y, this.ltaile.y, this.loksel.y + s, this.control3.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.loksel.x + s, this.lhand.x + s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.loksel.y + s, this.lhand.y + s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.control1.x, this.lhand.x + s, this.neck.x + s, this.control1.x, t);
        cy = curvePoint(this.control1.y, this.lhand.y + s, this.neck.y + s, this.control1.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
}
Figuur.prototype.drawPrint = function() {

    for (var i = 1; i < this.path.length; i++) {
        line(this.path[i - 1].x, this.path[i - 1].y, this.path[i].x, this.path[i].y);
    }

}