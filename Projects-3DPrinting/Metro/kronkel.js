//kronkel.js

function Kronkel(pos, maxwidth, maxheight) {
    this.path = [];
    this.start = pos.copy();
    this.offset = createVector(0, 0);
    this.ismoved = false;
    append(this.path, this.start);
    this.dx = [1, 1, 0, -1, -1, -1, 0, 1];
    this.dy = [0, 1, 1, 1, 0, -1, -1, -1];
    this.dir = floor(random(9));
    this.maxwidth = maxwidth;
    this.maxheight = maxheight;
    if (!this.check(pos)) {
        console.log("start posititie ligt buiten het bereik");
    }
}
Kronkel.prototype.check = function(pos) {
    var ok = false;
    if (pos.x >= 0 && pos.x <= this.maxwidth && pos.y >= 0 && pos.y <= this.maxheight) {
        if (!contains(this.path, pos)) {
            ok = true;
        }
    }

    return ok;
}
Kronkel.prototype.move = function(speed) {
    var p = this.path[this.path.length - 1].copy();
    this.dir = (this.dir + floor(random(3)) - 1) % 9;


    p.add(this.dx[this.dir] * speed, this.dy[this.dir] * speed);
    if (this.check(p)) {
        append(this.path, p.copy());
        this.ismoved = true;
    } else {
        this.ismoved = false;
    }
    return this.ismoved;
}
Kronkel.prototype.toendpath = function() {
    path = [];
    var p = this.path[this.path.length - 1].copy();
    p.x = this.maxwidth;
    append(path, p.copy());
    p.y = this.maxheight;
    append(path, p.copy());
    return path;

}
Kronkel.prototype.draw = function(pos) {
    this.offset = pos.copy();
    if (this.ismoved) {
        var last = this.path.length - 1;
        stroke(255, 0, 0);
        line(this.path[last - 1].x + pos.x, this.path[last - 1].y + pos.y, this.path[last].x + pos.x, this.path[last].y + pos.y);
    }

}