function Rups(from, size) {
    
    this.size = size;
    this.from = from;
    this.to =[];
}
Rups.prototype.draw = function(power1, power2, acolor) {
    stroke(acolor);
    power1.add(this.from[0]);
    power2.add(this.from[0]);

    

    for(var i = 0; i < this.from.length; i++){
       if(i == 0){
        this.to[i] = this.from[i].copy();
        if(this.from[i].x < 100 || this.from[i].x > width-100){
            this.to[i].x += map(rups.from[0].x, 0,width, 200,-200);
        }
        else{
            this.to[i].x += random(-100,100);
        }
        if(this.from[i].y < 100 || this.from[i].y > height-100){
            this.to[i].y += map(rups.from[0].y, 0,height, 100,-100);
        }
        else{
            this.to[i].y += random(-100,100);
        }
       }
       else{
        this.to[i] = this.to[0].copy();
        this.to[i].y += i*2;
       }
        
        curve(power1.x,power1.y,this.from[i].x, this.from[i].y, this.to[i].x, this.to[i].y, power2.x,power2.y + ((i -(this.from.length/2))*10));
        this.from[i] = this.to[i].copy();
        
    }
    
}