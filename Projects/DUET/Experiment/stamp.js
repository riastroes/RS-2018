function Stamp(stampwidth, stampheight) {
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
    for (var i = 0; i < this.image.pixels.length; i += 4) {
        this.image.pixels[i] = 0;
        this.image.pixels[i + 1] = 0;
        this.image.pixels[i + 2] = 0;
        this.image.pixels[i + 3] = 0;
    }
    this.image.updatePixels();
    return this.image.pixels;

}
Stamp.prototype.loadInk = function(img, px, py, hue, range) {
    // load this.pixels with the hue at position x,y on a given image.
    if (px < this.width) { px = this.width }
    if (px > img.width - this.width) { px = img.width - this.width }
    if (py < this.height) { py = this.height }
    if (py > img.height - this.height) { py = img.height - this.height }
    var x = floor(px);
    var y = floor(py);

    image(img, 0, 0);
    loadPixels();



    var param = [];
    var rgb = [];
    var i;
    var j = 0;
    var density = ((pixels.length / width) / height) / 4;
    console.log(density);

    for (var imgy = y; imgy < (y + this.height); imgy++) {
        for (var imgx = x; imgx < (x + this.width); imgx++) {
            i = (imgy * this.width * 4) + (imgx * 4);
            this.image.pixels[j] = pixels[i];
            this.image.pixels[j + 1] = pixels[i + 1];
            this.image.pixels[j + 2] = pixels[i + 2];
            this.image.pixels[j + 3] = 255;

            this.isloaded = true;
            // param = rgbToHsl(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]);

            // if ((param[0] * 360) > (hue - range) && (param[0] * 360) < hue + range) {
            //     //param[0] = (hue / 360);

            //     rgb = hslToRgb(param[0], param[1], param[2]);
            //     this.image.pixels[j] = rgb[0];
            //     this.image.pixels[j + 1] = rgb[1];
            //     this.image.pixels[j + 2] = rgb[2];
            //     this.image.pixels[j + 3] = 255;
            //     this.isloaded = true;
            // }
            j += 4;
        }
    }
    this.image.updatePixels();

}
Stamp.prototype.draw = function(x, y) {
    image(this.image, x, y);
}