function Mover(){
    this.x = width/2;
    this.y = height/2;
    this.dir = createVector( random(-1,1), random(-1,1));
    this.steps = 0;
}
Mover.prototype.randomWalk = function(speed){
    this.x += random(-1,1) * speed;
    this.y += random(-1,1) * speed;
}
Mover.prototype.walk = function(speed){
    this.x += this.dir.x * speed;
    this.y += this.dir.y * speed;
    if(this.steps == 0){
        this.steps = 50;
        this.changeDir();
    }
    this.steps -=1;
    this.x = constrain(this.x, 0,width);
    this.y = constrain(this.y, 0,height);
}
Mover.prototype.changeDir = function(){
    this.dir = createVector( random(-1,1), random(-1,1));
}
