function Inspiration(mwidth) {
    this.width = Math.floor(mwidth);
    this.width -= (this.width % 2);
    this.height = Math.floor(mwidth / 4 * 3);
    this.height -= (this.height % 2);
    this.canvas = document.getElementById("canvasinspiration");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    //this.image = document.createElement("IMG");
    //this.image.src = imgsrc[0];


    this.nr = 1;
    this.inspirationData;
    this.pixelData;

    //this.density = 1;
    this.rgb;
    this.hue;

}


Inspiration.prototype.changeInspiration = function(nr) {
    var btn = document.getElementById("btninspire" + this.nr);
    btn.className = "rs-button";
    this.nr = parseInt(nr);
    var btn = document.getElementById("btninspire" + this.nr);
    btn.className = "rs-button selected";

    this.ctx.drawImage(images[this.nr], 0, 0, images[this.nr].naturalWidth, images[this.nr].naturalHeight, 0, 0, this.width, this.height);
    this.inspirationData = this.ctx.getImageData(0, 0, this.width, this.height);

}
Inspiration.prototype.loadStamp = function() {

    if (event.ctrlKey) {
        event.defaultPrevented = true;
        event.cancleBubble = true;
        return false;
    } else {

        var x = event.offsetX;
        var y = event.offsetY;

        var sx = (stamp.width / 2);
        var sy = (stamp.height / 2);

        this.pixelData = this.ctx.getImageData(x, y, 1, 1);

        this.rgb = new RGB(this.pixelData.data[0], this.pixelData.data[1], this.pixelData.data[2]);
        this.hue = this.rgb.hue();

        palette.add(this.rgb.color);

        var count = 0;

        this.inspirationData = this.ctx.getImageData(x - sx, y - sy, stamp.width, stamp.height);
        var pixel = this.inspirationData;
        for (var i = 0; i < pixel.length; i += 4) {
            var hue = new RGB(pixel[i], pixel[i + 1], pixel[i + 2]).hue();
            if (this.hue - 30 >= hue && this.hue + 30 <= hue) {
                pixel[i + 3] = 255;
            } else {
                pixel[i + 3] = 0;
            }
        }
        this.inspirationData.data = pixel;
        stamp.loadStamp(this.inspirationData, this.hue);
    }

}