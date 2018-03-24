function Stamp() {
    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgstampsrc[0];
    this.image.style.display = "none";
    this.resize(100, 100);

    this.imgData;
    this.pixels;

    this.density = 1;
    this.color;
    this.ctx.drawImage(this.image, 0, 0);


}
Stamp.prototype.resize = function(w, h) {
    this.width = w;
    this.height = h;
}

Stamp.prototype.changeStamp = function(nr) {
    var i = parseInt(nr) - 1;
    this.image.src = imgstampsrc[i];
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
}
Stamp.prototype.createStamp = function(imgData) {
    this.imgData = imgData;
    this.ctx.putImageData(this.imgData, this.width, this.height);
    console.log("stamp pixels: " + this.imgData.data.length)

}