function Print() {
    this.skirt;
    this.path;
        
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
Print.prototype.create = function(layer, pos) {
    this.path = [];
    if (layer == 0) {
        this.path = this.path.concat(this.skirt());
        this.path = this.path.concat(this.createVlinder(pos));
    }
}
Print.prototype.createVlinder = function(pos){
    let path = [];
    let shape = new Shape();
    shape.createOnCircle(100, 4);
    shape.moveTo(pos);
    shape.style(color(255,0,0),color(255,0,0));
    shape.draw();
    
    path = shape.getPath();
    return path;
}