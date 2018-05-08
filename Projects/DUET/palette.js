function Palette() {
    this.panel = document.getElementById("divcanvassettings");
    this.info = document.getElementById("btnpaletteinfo");
    this.infotext = document.getElementById("divpaletteinfo");
    this.canvas = document.getElementById("canvaspalette");
    this.colors = new Array();
    this.selectedcolor;


}
Palette.prototype.init = function() {
    this.canvas.width = 400;
    this.canvas.height = 50;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener("click", this.callSelectColor);
    this.info.addEventListener("click", this.callShowInfo);
    this.infotext.addEventListener("click", this.callHideInfo);
    this.infotext.style.display = "none";
    this.addColor(new RGB(255, 255, 255));

}
Palette.prototype.callShowInfo = function() {

    event.stopPropagation();

    if (app.palette.infotext.style.display == "none" || app.palette.infotext.style.display == undefined || app.palette.infotext.style.display == "") {
        app.palette.infotext.style.display = "block";
    } else {
        app.palette.infotext.style.display = "none";
    }

}
Palette.prototype.callHideInfo = function() {

    event.stopPropagation();

    app.palette.infotext.style.display = "none";

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
Palette.prototype.addColor = function(rgb) {
    var next = this.colors.length;
    this.colors[next] = rgb.color;
    this.show();
}
Palette.prototype.callSelectColor = function() {

    var x = event.offsetX;
    var w = app.palette.canvas.width / app.palette.colors.length;
    var i = Math.floor(x / w);

    if (i >= 0 && i < app.palette.colors.length) {
        app.palette.selectedcolor = app.palette.colors[i];
        app.design.changeBackgroundColor(app.palette.selectedcolor);
        app.callClosePanel();
    }

}