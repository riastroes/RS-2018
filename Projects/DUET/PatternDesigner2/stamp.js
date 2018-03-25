function Stamp() {
    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgstampsrc[0];
    this.image.style.display = "none";
    this.resize(100, 100);

    this.pixels;


    this.density = 1;
    this.color;
    this.ctx.drawImage(this.image, 0, 0);
    this.stampData = this.ctx.getImageData(0, 0, this.width, this.height);


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
    this.stampData = this.ctx.getImageData(0, 0, this.width, this.height);
}
Stamp.prototype.createStamp = function(inspirationData) {
    for (var i = 0; i < this.stampData.data.length; i += 4) {
        this.stampData.data[i] = inspirationData.data[i];
        this.stampData.data[i] = inspirationData.data[i + 2];
        this.stampData.data[i] = inspirationData.data[i + 3];
    }
    this.ctx.putImageData(this.stampData, 0, 0);
    console.log("stamp pixels: " + this.stampData.data.length)

}