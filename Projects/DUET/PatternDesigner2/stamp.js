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
    this.stampData = this.ctx.getImageData(0,0, this.width, this.height)
    this.createStamp(this.stampData);

}
Stamp.prototype.resize = function(w, h) {
    this.width = w;
    this.height = h;
}

Stamp.prototype.changeStamp = function(nr) {
    var i = parseInt(nr) - 1;
    this.image.src = imgstampsrc[i];
    this.ctx.fillStyle = "transparent";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
    this.stampData = this.ctx.getImageData(0,0, this.width, this.height)
    this.createStamp(this.stampData);
}
Stamp.prototype.createStamp = function(stampData) {
    
    this.ctx.putImageData(stampData, 0,0);
    for(var i = 0; i < stampData.data.length; i+=4){
        stampData.data[i+3] = 0;
    }

    console.log("stamp pixels: " + stampData.data.length)

}
Stamp.prototype.loadStamp = function(inspirationData, hue){
    
    for(var i = 0; i < inspirationData.data.length; i+=4){
        var rgb = new RGB(inspirationData.data[i],inspirationData.data[i+1],inspirationData.data[i+2]);
        var datahue = rgb.hue();
        if(datahue > (hue-30) && datahue <= (hue+30)){
            inspirationData.data[i+3] = this.stampData.data[i+3];
        }
        else{
            inspirationData.data[i] = this.stampData.data[i];
            inspirationData.data[i+1] = this.stampData.data[i+1];
            inspirationData.data[i+2] = this.stampData.data[i+2];
            inspirationData.data[i+3] = this.stampData.data[i+3];
        }
    }
    this.ctx.putImageData(inspirationData, 0,0);
    console.log("stamp pixels: " + inspirationData, inspirationData.data.length)
}