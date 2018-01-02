function Print(pos) {
    this.skirt;
    this.path;
    this.pos = pos.copy();


}
Print.prototype.skirt = function() {
    let p = [];
    p[0] = createVector(150, 30, 0);
    p[1] = createVector(750, 30, 0);
    p[2] = createVector(150, 50, 0);
    p[3] = createVector(750, 50, 0);
    return p;
}
Print.prototype.getPrint = function() {
    return this.path;
}
Print.prototype.create = function(layer) {
    this.path = [];
    if (layer == 0) {
        this.path = this.path.concat(this.skirt());

    }
}