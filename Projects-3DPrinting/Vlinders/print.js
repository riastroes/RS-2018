function Print() {
    this.skirt;
    this.path;

}
Print.prototype.skirt = function() {
    let p = [];
    p[0] = createVector(150, 30, 0);
    p[1] = createVector(750, 30, 0);
    p[2] = createVector(150, 50, 0);
    //p[3] = createVector(450, 50, 0);
    return p;
}
Print.prototype.getPrint = function() {

    return this.path;
}
Print.prototype.create = function(layer) {
    this.path = [];
    var pos = createVector(100,150);
    if (layer == 0) {
        this.path = this.path.concat(this.skirt());
        
        // this.path = this.path.concat(this.createVlinder(pos.add(20, 0)));
     }
        this.path = this.path.concat(createVector(80, 70));
        this.path = this.path.concat(this.createVlinder(pos));
        this.path = this.path.concat(createVector(120, 70));
        this.path = this.path.concat(createVector(250, 70));
        this.path = this.path.concat(this.createVlinder(pos.copy().add(170,0)));
        this.path = this.path.concat(createVector(290, 70));
        this.path = this.path.concat(createVector(420, 70));
        this.path = this.path.concat(this.createVlinder(pos.copy().add(340,0)));
        this.path = this.path.concat(createVector(460, 70));
        this.path = this.path.concat(createVector(590, 70));
        this.path = this.path.concat(this.createVlinder(pos.copy().add(510,0)));
        this.path = this.path.concat(createVector(630, 70));
        this.path = this.path.concat(createVector(760, 70));
        this.path = this.path.concat(this.createVlinder(pos.copy().add(680,0)));
        this.path = this.path.concat(createVector(800, 70));
        this.path = this.path.concat(createVector(920, 70));
        this.path = this.path.concat(this.createVlinder(pos.copy().add(840,0)));
        this.path = this.path.concat(createVector(960, 70));
}
Print.prototype.createVlinder = function(pos) {

    let path = [];
    let shape = new Shape();
    let list = [];

    //kop
    shape = new Shape();
    let a = TWO_PI / 4;
    list = [a, a * 2, a * 3, a * 4];
    shape.createOnCircle(25, list);
    shape.moveTo(pos);
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();
    path = shape.getPath();

    //lijf
    shape = new Shape();
    a = TWO_PI / 4;
    list = [a * 3, 0, a, a * 2];
    shape.createOnEllipse(25, 100, list);
    shape.moveTo(pos.add(0, 60));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = path.concat(shape.getPath());


    //linkervleugel
    shape = new Shape();
    list = [0, (PI + (PI / 2)), PI, PI / 2];
    shape.createOnEllipse(50, 150, list);
    shape.p[0].add(50, 0);
    shape.p[2].add(40, -15);
    shape.moveTo(pos.add(-75, -25));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = path.concat(shape.getPath());


    //rechtervleugel
    shape = new Shape();
    list = [PI, (PI + (PI / 2)), 0, PI / 2]
    shape.createOnEllipse(50, 150, list);
    shape.p[0].add(-50, 0);
    shape.p[2].add(-40, -15);
    shape.moveTo(pos.add(150, 0));

    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();


    path = path.concat(shape.getPath());

    path = path.concat(pos.add(-75, -25));







    return path;
}