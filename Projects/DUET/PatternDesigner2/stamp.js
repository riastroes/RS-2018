function Stamp(stampwidth, stampheight) {
    this.width = stampwidth;
    this.height = stampheight;
    this.isloaded = false;
    this.image;
    // this.mask;

    this.pixels = this.init();

}
Stamp.prototype.init = function() {
    //initialize this.image with a transparant background

    this.image = createImage(this.width, this.height);
    this.image.loadPixels();
    // this.mask = createImage(this.width, this.height);
    // this.mask.loadPixels();

    var density = this.image.pixels.length / this.width / this.height / 4;
    for (var i = 0; i < this.image.pixels.length; i += 4) {
        this.image.pixels[i] = 0;
        this.image.pixels[i + 1] = 0;
        this.image.pixels[i + 2] = 0;
        this.image.pixels[i + 3] = 0; //transparent
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

Stamp.prototype.loadInk = function(inspiration, px, py, ahue, asat, alight, range) {
    // load this.pixels with the hue at position x,y on a given image.
    // if (px < this.width) { px = this.width }
    // if (px > acanvas.width - this.width) { px = img.width - this.width }
    // if (py < this.height) { py = this.height }
    // if (py > acanvas.height - this.height) { py = acanvas.height - this.height }
    var x = floor(px);
    var y = floor(py);
    console.log(x, y);
    lastx = x;
    lasty = y

    this.pixels = this.init();



    var param = [];
    var rgb = [];
    var i;
    var j = 0;

    for (var a = y; a < (y + this.height); a++) {
        for (var b = x; b < (x + this.width); b++) {
            i = (a * inspiration.width * 4) + (b * 4);
            //j = ((a - y) * this.image.width * 4) + ((b - x) * 4);

            param = rgbToHsl(inspiration.pixels[i], inspiration.pixels[i + 1], inspiration.pixels[i + 2]);
            if ((  param[0] * 360) > (ahue - range) && (param[0] * 360) < (ahue + range)
               // && (param[1] * 100) > (asat - range) && (param[1] * 100) < (asat + range)
               // && (param[2] * 100) > (alight - range) && (param[1] * 100) < (alight + range)
              
            ) {
                this.image.pixels[j] = inspiration.pixels[i];
                this.image.pixels[j + 1] = inspiration.pixels[i + 1];
                this.image.pixels[j + 2] = inspiration.pixels[i + 2];
                this.image.pixels[j + 3] = stampmasker.pixels[j+3] ;
                

            }
            // else{
            //    // this.image.pixels[j] = 255;
            //     this.image.pixels[j + 1] = 255;
            //     this.image.pixels[j + 2] = 255;
            //     this.image.pixels[j + 3] = 255 ;
            // }
           
                            
            j += 4;
        }
    }
    this.image.updatePixels();

}
Stamp.prototype.draw = function(x, y) {
    image(this.image, x, y);
}
Stamp.prototype.mask = function(img) {
    //img.resize(this.width, this.height);
    this.image.mask(img);
}
Stamp.prototype.getData = function(imgdata) {
    for (var i = 0; i < this.image.pixels.length; i++) {
        if(imgdata.data[i+3] != 0){
            imgdata.data[i] = this.image.pixels[i];
        }
    }

}