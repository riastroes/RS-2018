function Rgb(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
}
Rgb.prototype.compare = function(acolor, colormarge){
    
        let ok = false;
        if (abs(this.r - red(acolor) < colormarge) &&
            abs(this.g - green(acolor) < colormarge) &&
            abs(this.b - blue(acolor) < colormarge)) {
            ok = true;
        }
        return ok;
   
}