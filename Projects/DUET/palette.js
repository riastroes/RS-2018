function Palette(mwidth) {
    this.width = Math.floor(mwidth - 20);
    this.width += (this.width % 2);
    this.width = mwidth;
    this.canvas = document.getElementById("canvaspalette");
    this.canvas.width = this.width;
    this.canvas.height = 50;
    this.ctx = this.canvas.getContext("2d");
    this.colors = new Array();
}
Palette.prototype.show = function() {
    var x, y;
    var w, h;
    y = 0;
    w = this.canvas.width / this.colors.length;
    h = this.canvas.height;

    for (var i = 0; i < this.colors.length; i++) {
        x = i * w;
        this.ctx.fillStyle = this.colors[i];
        this.ctx.fillRect(x, y, w, h);
    }
}
Palette.prototype.add = function(acolor) {
    var next = this.colors.length;
    this.colors[next] = acolor;
    this.show();
}
Palette.prototype.background = function() {

    var x = event.offsetX;
    var w = this.canvas.width / this.colors.length;
    var i = Math.floor(x / w);

    if (i >= 0 && i < this.colors.length) {
        var bgcolor = this.colors[i];
        this.colors = new Array();
        this.colors[0] = bgcolor;

        design.background(this.colors[0]);
        this.show();
    }

}
Palette.prototype.save = function() {

    var pal = document.createElement('a');

    pal.href = this.canvas.toDataURL();
    pal.download = "DUET-palette.jpg";
    pal.click();

}