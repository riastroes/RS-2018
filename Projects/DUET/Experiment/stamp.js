function Stamp( stampwidth, stampheight) {
    this.width = stampwidth;
    this.height = stampheight;
    this.isloaded = false;
    this.image;
    
    this.pixels = this.init();

}
Stamp.prototype.init = function() {
    //initialize this.image with a transparant background

    this.image = createImage(this.width, this.height);
    this.image.loadPixels();
    var density = this.image.pixels.length / this.width / this.height / 4;
    for (var i = 0; i < this.image.pixels.length; i += 4) {
        this.image.pixels[i] = 0;
        this.image.pixels[i + 1] = 0;
        this.image.pixels[i + 2] = 0;
        this.image.pixels[i + 3] = 0;//transparent
    }
    this.image.updatePixels();

    return this.image.pixels;

}
Stamp.prototype.grow = function(force) {
    this.width += force;
    this.height += force;
    this.init();
}
Stamp.prototype.shrink = function(force) {
    this.width -= force;
    this.height -= force;
    this.init();
}

Stamp.prototype.loadInk = function(acanvas, inspiration, px, py, hue, range) {
    // load this.pixels with the hue at position x,y on a given image.
    // if (px < this.width) { px = this.width }
    // if (px > acanvas.width - this.width) { px = img.width - this.width }
    // if (py < this.height) { py = this.height }
    // if (py > acanvas.height - this.height) { py = acanvas.height - this.height }
    var x = floor(px);
    var y = floor(py);
    console.log(x,y);
    
    this.pixels = this.init();



    var param = [];
    var rgb = [];
    var i;
    var j = 0;
    
    var stampforce = 0;

    for (var a = y; a < (y + this.height); a++) {
        for (var b = x; b < (x + this.width); b++) {
            i = (a * acanvas.width * 4) + (b * 4);
            //j = ((a - y) * this.image.width * 4) + ((b - x) * 4);

            param = rgbToHsl(inspiration.data[i], inspiration.data[i + 1], inspiration.data[i + 2]);
            if ((param[0] * 360) > (hue - range) && (param[0] * 360) < hue + range) {
                this.image.pixels[j] = inspiration.data[i];
                this.image.pixels[j + 1] = inspiration.data[i + 1];
                this.image.pixels[j + 2] = inspiration.data[i + 2];
                this.image.pixels[j + 3] = 255;
                stampforce++;
                
            }
            j+=4;
        }
    }
    if(stampforce > 0){
        this.image.updatePixels();
    }
    
    console.log("stampforce", stampforce)

}
Stamp.prototype.draw = function(x, y) {
    image(this.image, x, y);
}
Stamp.prototype.mask = function(img) {
    //img.resize(this.width, this.height);
    this.image.mask(img);
}
Stamp.prototype.getData = function(imgdata){
    for(var i = 0; i < this.image.pixels.length; i++){
            imgdata.data[i] = this.image.pixels[i];
    }
    
}