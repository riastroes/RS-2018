function Print() {
    this.skirt;
    this.path;

}
Print.prototype.skirt = function() {
    let p = [];
    p[0] = createVector(150, 30, 0);
    p[1] = createVector(750, 30, 0);
    p[2] = createVector(150, 50, 0);
    //p[3] = createVector(750, 50, 0);
    return p;
}
Print.prototype.getPrint = function() {

    return this.path;
}
Print.prototype.create = function(layer) {
    this.path = [];
    var pos = createVector(320,550);
    if (layer == 0) {
        this.path = this.path.concat(this.skirt());
        this.path = this.path.concat(createVector(20, 300));
        this.path = this.path.concat(this.createVlinder(pos));
        
        // this.path = this.path.concat(this.createVlinder(pos.add(20, 0)));
    }
    else{
        
        this.path = this.path.concat(this.createVlinder(pos));
    }
}
Print.prototype.createVlinder = function(pos) {
    
    let path = [];
    let shape = new Shape();
    let list = [0,PI/2, PI, PI+(PI/2)]; 

    //linkervleugel
    shape.createOnEllipse(100, 300, list);
    shape.p[0].add(100,0);
    shape.moveTo(pos);
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = shape.getPath();
    
    
    //rechtervleugel
    shape = new Shape();
    list = [PI,PI/2, 0, -(PI/2)]; 
    shape.createOnEllipse(100, 300, list);
    shape.p[0].add(-100,0);
    shape.moveTo(pos.add(300,0));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();

    path = path.concat(shape.getPath());

    //kop
    shape = new Shape();
    list = [0, TWO_PI /5,  (TWO_PI /5)*2,  (TWO_PI /5)*3,  (TWO_PI /5)*4]; 
    shape.createOnCircle(50,list);
    shape.moveTo(pos.add(-150,50));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();
    path = path.concat(createVector(750, 700));
    path = path.concat(shape.getPath());

    //lijf
    shape = new Shape();
    list = [0, TWO_PI /5,  (TWO_PI /5)*2,  (TWO_PI /5)*3,  (TWO_PI /5)*4]; 
    shape.createOnEllipse(50,200, list);
    shape.moveTo(pos.add(0,-100));
    shape.style(color(255, 0, 0, 30), color(255, 0, 0, 30));
    shape.draw();
    
    path = path.concat(shape.getPath());
    path = path.concat(createVector(650, 700));

    return path;
}