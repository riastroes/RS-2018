function Print() {
    this.skirt;
    this.path;

}
Print.prototype.skirt = function() {
    let p = [];
    p[0] = createVector(150, 30, 0);
    p[1] = createVector(750, 30, 0);
    p[2] = createVector(150, 50, 0);
    p[3] = createVector(450, 50, 0);
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


    } else {

        this.path = this.path.concat(this.createVlinder(pos));
    }

}
Print.prototype.createVlinder = function(pos) {

    let path = [];
    let shape = new Shape();
    let list = [];

    //kop
    shape = new Shape();
    let a = TWO_PI / 4;
    list = [a, a * 2, a * 3, a * 4];
    shape.createOnCircle(50, list);
    shape.moveTo(pos);
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();
    path = path.concat(shape.getPath());

    //lijf
    shape = new Shape();
    a = TWO_PI / 4;
    list = [a * 3, 0, a, a * 2];
    shape.createOnEllipse(50, 200, list);
    shape.moveTo(pos.add(0, 120));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = path.concat(shape.getPath());


    //linkervleugel
    shape = new Shape();
    list = [0, (PI + (PI / 2)), PI, PI / 2];
    shape.createOnEllipse(100, 300, list);
    shape.p[0].add(100, 0);
    shape.p[2].add(75, -30);
    shape.moveTo(pos.add(-150, -50));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = path.concat(shape.getPath());


    //rechtervleugel
    shape = new Shape();
    list = [PI, (PI + (PI / 2)), 0, PI / 2]
    shape.createOnEllipse(100, 300, list);
    shape.p[0].add(-100, 0);
    shape.p[2].add(-75, -30);
    shape.moveTo(pos.add(300, 0));

    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();


    path = path.concat(shape.getPath());

    path = path.concat(pos.add(-150, -50));

    //voelspriet





    return path;
}