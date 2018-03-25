function Inspiration() {
    this.canvas = document.getElementById("canvasinspiration");
    this.canvas.width = 400;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgsrc[0];
      
    this.inspirationData;
    this.pixelData;;

    this.density = 1;
    this.rgb;
    this.hue;
  
}


Inspiration.prototype.changeInspiration = function(nr) {
    var i = parseInt(nr) - 1;
    this.image.src = imgsrc[i];
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0,0, this.canvas.width, this.canvas.height);
    this.inspirationData = this.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
    console.log(this.image.width, this.image.height);
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
    this.pixelData = this.ctx.getImageData(x, y, 1, 1);
    
    this.rgb = new RGB(this.pixelData.data[0], this.pixelData.data[1], this.pixelData.data[2]);
    this.hue = this.rgb.hue();
    
    palette.add(this.rgb.color);
    
    var count = 0;

    this.imgData = this.ctx.getImageData(x - sx, y - sy, 100, 100);
    var pixel = this.imgData.data;
    for (var i = 0; i < pixel.length; i += 4) {
        var hue = new RGB(pixel[i], pixel[i + 1], pixel[i + 2]).hue();
        if (this.hue - 30 >= hue && this.hue + 30 <= hue) {
            pixel[i + 3] = 255;
        } else {
            pixel[i + 3] = 0;
        }
    }
    this.imgData.data = pixel;

    stamp.createStamp(this.imgData)


}