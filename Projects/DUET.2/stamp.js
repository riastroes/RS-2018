function Stamp(mwidth) {
    this.maxwidth = Math.floor(mwidth);
    this.maxwidth -= (this.maxwidth % 2);

    var instampsize = document.getElementById("instampsize");
    if (this.maxwidth > parseInt(instampsize.max)) {
        this.maxwidth = parseInt(instampsize.max);

    }
    instampsize.value = this.maxwidth;
    var lblstampsize = document.getElementById("lblstampsize");
    lblstampsize.innerHTML = "size: " + this.maxwidth + "px ";

    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = this.maxwidth;
    this.canvas.height = this.maxwidth;
    this.stampsize = this.maxwidth; //beginnen met de grootste stempel.
    this.width = this.maxwidth;
    this.height = this.maxwidth;
    this.ctx = this.canvas.getContext('2d');
    this.imgfilter = stamps[this.nr];
    this.color;
    this.nr = 1;

}
Stamp.prototype.init = function(w, h) {
    this.canvas = document.getElementById("canvasstamp");
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');
    this.imgfilter = stamps[this.nr];
    this.ctx.drawImage(this.imgfilter, 0, 0, this.imgfilter.naturalWidth, this.imgfilter.naturalHeight, 0, 0, this.width, this.height);
    this.filter = this.ctx.getImageData(0, 0, this.width, this.height); //filter
    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp


}
Stamp.prototype.resize = function(s) {
    this.stampsize = Math.floor(parseInt(s));
    this.stampsize -= (this.stampsize % 2);
    var instampsize = document.getElementById("instampsize");
    instampsize.value = this.stampsize.toString();
    var label = document.getElementById("lblstampsize");
    label.innerHTML = "size: " + this.stampsize + "px ";
    this.width = this.stampsize;
    this.height = this.stampsize;

    this.init(this.width, this.height);

}

Stamp.prototype.changeStamp = function(nr) {
    var btnstamp = document.getElementById("btnstamp" + this.nr);
    btnstamp.className = "rs-button";
    this.nr = parseInt(nr);
    var btnstamp = document.getElementById("btnstamp" + this.nr);
    btnstamp.className = "rs-button selected";

    this.init(this.width, this.height);

}
Stamp.prototype.loadStamp = function(inspirationData, stamptype, argb) {

    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp

    for (var i = 0; i < inspirationData.data.length; i += 4) {
        var rgb = new RGB(inspirationData.data[i], inspirationData.data[i + 1], inspirationData.data[i + 2]);



        if (stamptype == "hue") {
            var datahue = rgb.hue();
            if (datahue >= (argb.hue() - 20) && datahue <= (argb.hue() + 20) &&
                this.filter.data[i] === 0 && this.filter.data[i + 3] > 0) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }
        if (stamptype == "saturation") {
            var datasaturation = rgb.saturation();
            if (datasaturation >= (argb.saturation() - 10) && datasaturation <= (argb.saturation() + 10) && this.filter.data[i] === 0 && this.filter.data[i + 3] > 0) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }
        if (stamptype == "lightness") {
            var datalightness = rgb.lightness();
            if (datalightness >= (argb.lightness() - 10) && datalightness <= (argb.lightness() + 10) && this.filter.data[i] === 0 && this.filter.data[i + 3] > 0) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }
        if (stamptype == "copy") {

            if (inspirationData.data[i + 3] > 0 && (this.filter.data[i + 3] > 0)) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }

    }

    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.putImageData(this.stampData, 0, 0);

}