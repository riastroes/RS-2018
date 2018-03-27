function RGB(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.color = 'rgb(' + this.r + ", " + this.g + ", " + this.b + ')';

}
RGB.prototype.hue = function() {
    var param = rgbToHsl(this.r, this.g, this.b)
    var hue = Math.floor(param[0]* 360);
    return hue;
}

