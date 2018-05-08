function Inspiration(w, h) {
    this.inspirationpanel = document.getElementById("divinspiration");
    this.info = document.getElementById("btninspirationinfo");
    this.infotext = document.getElementById("divinspirationinfo");
    this.canvas = document.getElementById("canvasinspiration");
    this.selectinspiration = document.getElementById("divselectinspiration");
    this.canvas.width = w;
    this.canvas.height = h;
    this.width = w;
    this.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.nr = 1;
    this.btninspirations = [];
    this.selectedcolor;
    this.inspirationData;
}
Inspiration.prototype.init = function() {
    this.canvas.addEventListener("click", app.inspiration.click);
    this.info.addEventListener("click", app.inspiration.showInfo);
    this.infotext.addEventListener("click", app.inspiration.hideInfo);
    this.infotext.style.display = "none";
    for (var i = 1; i <= 9; i++) {
        this.btninspirations[i] = document.getElementById("btninspiration" + i);
        this.btninspirations[i].src = images[i].src;
        this.btninspirations[i].addEventListener("click", app.inspiration.changeInspiration);
    }


}
Inspiration.prototype.draw = function() {
    this.ctx.drawImage(images[this.nr], 0, 0, images[this.nr].naturalWidth, images[this.nr].naturalHeight, 0, 0, this.width, this.height);

}

Inspiration.prototype.showInfo = function() {

    event.stopPropagation();
    if (app.inspiration.infotext.style.display == "none" || app.inspiration.infotext.style.display == undefined || app.inspiration.infotext.style.display == "") {

        app.inspiration.infotext.style.display = "block";
        app.inspiration.infotext.style.left = (event.offsetX + 30) + "px";
        app.inspiration.infotext.style.top = (event.offsetY - 10) + "px";
    } else {
        app.inspiration.infotext.style.display = "none";
    }

}
Inspiration.prototype.hideInfo = function() {

    event.stopPropagation();

    app.inspiration.infotext.style.display = "none";

}
Inspiration.prototype.changeInspiration = function() {

    app.inspiration.nr = event.srcElement.alt;
    app.inspiration.draw();
    return app.stop();

}
Inspiration.prototype.click = function() {

    event.stopPropagation();
    let x = Math.floor(event.offsetX);
    let y = Math.floor(event.offsetY);
    let pixelData = app.inspiration.ctx.getImageData(x, y, 1, 1);
    app.inspiration.selectedRGB = new RGB(pixelData.data[0], pixelData.data[1], pixelData.data[2]);


    app.palette.addColor(app.inspiration.selectedRGB);
    app.inspiration.fillStamp(x, y, app.stamp.type);
    app.stamp.draw();

}
Inspiration.prototype.fillStamp = function(x, y, type) {
    var sx = (app.stamp.width / 2);
    var sy = (app.stamp.height / 2);
    this.inspirationData = this.ctx.getImageData(x - sx, y - sy, app.stamp.width, app.stamp.height);
    var pixels = this.inspirationData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        if (type == "color") {
            this.hue = this.selectedRGB.hue();
            var hue = new RGB(pixels[i], pixels[i + 1], pixels[i + 2]).hue();
            if (this.hue - 30 >= hue && this.hue + 30 <= hue) {
                pixels[i + 3] = 255;
            } else {
                pixels[i + 3] = 0;
            }
        } else if (type == "lightness") {
            this.lightness = this.selectedRGB.lightness();
            var lightness = new RGB(pixels[i], pixels[i + 1], pixels[i + 2]).lightness();
            if (this.lightness - 10 >= lightness && this.lightness + 10 <= lightness) {
                pixels[i + 3] = 255;
            } else {
                pixels[i + 3] = 0;
            }
        } else if (type == "copy") {
            if (pixels[i + 3] != 0) {
                pixels[i + 3] = 255;
            } else {
                pixels[i + 3] = 0;
            }
        }
    }

}