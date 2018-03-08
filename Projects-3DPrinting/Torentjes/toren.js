function Print(pos) {
    this.skirt;
    this.path;
    this.pos = pos.copy();
    this.torens = [];


}
Print.prototype.skirt = function() {
    let p = [];
    p[0] = createVector(150, 30, 0);
    p[1] = createVector(750, 30, 0);
    p[2] = createVector(150, 50, 0);
   // p[3] = createVector(750, 50, 0);
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
    this.path = this.path.concat(this.createTowers(2,createVector(50,100), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(250,100), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(450,100), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(650,100), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(850,100), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(50,450), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(250,450), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(450,450), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(650,450), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(850,450), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(50,800), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(250,800), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(450,800), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(650,800), 8));
    this.path = this.path.concat(this.createTowers(2,createVector(850,800), 8));
   

}
Print.prototype.createTowers = function(max, pos, size){
    this.torens[0] = pos;
    this.torens[1] = pos.copy().add(30,0);
   
    var apath = [];
    var corner
    
    var radius = 12;
   
    for(var z = 0; z <= size; z +=0.3){
        for(var t = 0 ; t < max; t++){
            if(t % 2 == 0){
                corner = 0;
            }
            else{corner = PI};
            for(var angle = 0; angle <= TWO_PI; angle +=(TWO_PI/8)){
            var x = this.torens[t].x + (radius * cos(angle + corner));
            var y = this.torens[t].y + (radius * sin(angle + corner));
            append(apath, createVector(x, y, z));
            }
           
        }
        //radius -= 0.6;
    }
   
    
    return apath;
    
}