function Inspiration() {
    this.canvas = document.getElementById("canvasinspiration");
    this.canvas.width = 400;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgsrc[0];
    this.image.widht = 400;
    this.image.height = 300;
    this.image.style.display = "none";

    this.imgData;
    this.pixel;

    this.density = 1;
    this.rgb;
    this.hue;
    this.ctx.drawImage(this.image, 0, 0);


}
Inspiration.prototype.init = function(pimg, w, h) {


}

Inspiration.prototype.changeInspiration = function(nr) {
    var i = parseInt(nr) - 1;
    this.image.src = imgsrc[i];
    this.ctx.drawImage(this.image, 0, 0);
}
Inspiration.prototype.loadStamp = function() {
    var x = event.offsetX;
    var y = event.offsetY;
    var sx = 50;
    var sy = 50;
    if (x < 50) {
        sx = x;
    }
    if (y < 50) {
        sy = y
    }
    this.imgData = this.ctx.getImageData(x, y, 1, 1);
    this.pixel = this.imgData.data;
    this.rgb = new RGB(this.pixel[0], this.pixel[1], this.pixel[2]);
    this.hue = this.rgb.hue();
    
    palette.add(this.rgb.color);
    
    var count = 0;

    this.imgData = this.ctx.getImageData(x - sx, y - sy, 100, 100);
    
    stamp.loadStamp(this.imgData, this.hue);
    
    
    //stamp.createStamp(this.imgData)


}