function Stamp() {
    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgstampsrc[0];
    this.image.style.display = "none";
    this.width = 100;
    this.height = 100;
    this.density = 1;
    this.color;
    this.ctx.drawImage(this.image, 0, 0);
    this.filter = this.ctx.getImageData(0, 0, this.width, this.height); //filter
    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp


}
Stamp.prototype.init = function(w,h){
    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.image = document.createElement("IMG");
    this.image.src = imgstampsrc[0];
    this.image.style.display = "none";
    this.width = w;
    this.height = h;
    this.density = 1;
    this.color;
    this.ctx.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, 0,0, this.width, this.height);
    this.filter = this.ctx.getImageData(0, 0, this.width, this.height); //filter
    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp
}
Stamp.prototype.resize = function(s) {
    var w = parseInt(s);
    var h = parseInt(s);
    this.init(w,h);
    inspiration.loadStamp();
}

Stamp.prototype.changeStamp = function(nr) {
        var i = parseInt(nr) - 1;
        this.image.src = imgstampsrc[i];
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);
        this.filter = this.ctx.getImageData(0, 0, this.width, this.height); //filter
        this.loadStamp(inspiration.inspirationData, inspiration.hue);
        
    }
   

Stamp.prototype.loadStamp = function(inspirationData, hue) {
    
    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp

    for (var i = 0; i < inspirationData.data.length; i += 4) {
        var rgb = new RGB(inspirationData.data[i], inspirationData.data[i + 1], inspirationData.data[i + 2]);
        var datahue = rgb.hue();
        if (datahue >= (hue - 20) && datahue <= (hue + 20) &&
            this.filter.data[i] > 200) {
            this.stampData.data[i] = inspirationData.data[i];
            this.stampData.data[i + 1] = inspirationData.data[i + 1];
            this.stampData.data[i + 2] = inspirationData.data[i + 2];
            this.stampData.data[i + 3] = this.filter.data[i + 3];
        }
    }
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.putImageData(this.stampData, 0, 0);
    
}
