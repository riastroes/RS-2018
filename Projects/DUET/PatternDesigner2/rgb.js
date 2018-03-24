function RGB(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.color = 'rgb(' + this.r + ", " + this.g + ", " + this.b + ')';

}
RGB.prototype.hue = function() {
    // strip the leading # if it's there
    //rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    // if (rgb.length == 3) {
    //     rgb = rgb.replace(/(.)/g, '$1$1');
    // }

    var cMax = Math.max(this.r / 255, this.g / 255, this.b / 255);
    var cMin = Math.min(this.r / 255, this.g / 255, this.b / 255);
    var delta = cMax - cMin;
    var l = (cMax + cMin) / 2;
    var h = 0;
    var s = 0;

    if (delta == 0) {
        h = 0;
    } else if (cMax == this.r) {
        h = 60 * (((this.g - this.b) / delta) % 6);
    } else if (cMax == this.g) {
        h = 60 * (((this.b - this.r) / delta) + 2);
    } else {
        h = 60 * (((this.r - this.g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    } else {
        s = (delta / (1 - Math.abs(2 * l - 1)))
    }

    return h;
}