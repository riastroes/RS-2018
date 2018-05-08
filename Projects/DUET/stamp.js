function Stamp() {
    this.stamppanel = document.getElementById("divstamp");
    this.info = document.getElementById("btnstampinfo");
    this.infotext = document.getElementById("divstampinfo");
    this.infostampsize = document.getElementById("btnstampsizeinfo");
    this.infotextstampsize = document.getElementById("divstampsizeinfo");
    this.infostampbehaviour = document.getElementById("btnstampbehaviourinfo");
    this.infotextstampbehaviour = document.getElementById("divstampbehaviourinfo");

    this.inrangestampwidth = document.getElementById("inrangestampwidth");
    this.inrangestampheight = document.getElementById("inrangestampheight");
    this.canvas = document.getElementById("canvasstamp");
    this.selectstamp = document.getElementById("divselectstamp");
    this.inrangerepeat = document.getElementById("inrangerepeat");
    this.inrangescale = document.getElementById("inrangescale");
    this.lblrepeat = document.getElementById("lblrepeat");
    this.lblscale = document.getElementById("lblscale");

    this.stamptypes = document.getElementsByName("inradiostamptype");
    this.type;
    this.btnstamps = [];
    this.nr = 1;
    this.filter;
}
Stamp.prototype.init = function(w, h, repeat, scale) {
    this.canvas.addEventListener("click", this.callClick); ///DIT MOET NOG ANDERS
    this.info.addEventListener("click", this.callShowInfo);
    this.infotext.addEventListener("click", this.callHideInfo);
    this.infotext.style.display = "none";
    this.infostampsize.addEventListener("click", this.callShowInfoStampSize);
    this.infotextstampsize.addEventListener("click", this.callHideInfoStampSize);
    this.infotextstampsize.style.display = "none";
    this.infostampbehaviour.addEventListener("click", this.callShowInfoStampBehaviour);
    this.infotextstampbehaviour.addEventListener("click", this.callHideInfoStampBehaviour);
    this.infotextstampbehaviour.style.display = "none";

    this.inrangestampwidth.addEventListener("change", this.callChangeStampSize);
    this.inrangestampheight.addEventListener("change", this.callChangeStampSize);
    for (var i = 0; i < 3; i++) {
        this.stamptypes[i].addEventListener("click", this.callChangeStampType);
    }
    this.type = "color";
    for (var i = 1; i <= 8; i++) {
        this.btnstamps[i] = document.getElementById("btnstamp" + i);
        this.btnstamps[i].src = stamps[i].src;
        this.btnstamps[i].addEventListener("click", this.callChangeStamp);
    }

    this.canvas.width = w * app.dpi;
    this.canvas.height = h * app.dpi;
    this.width = w * app.dpi;
    this.height = h * app.dpi;
    var lblwidth = document.getElementById("lblstampwidth");
    lblwidth.innerHTML = " " + w + " cm";
    var lblheight = document.getElementById("lblstampheight");
    lblheight.innerHTML = " " + h + " cm";
    this.canvas.style.width = Math.floor(w * (app.scale * 100)) + "px";
    this.canvas.style.height = Math.floor(h * (app.scale * 100)) + "px";
    this.ctx = this.canvas.getContext('2d');

    this.inrangerepeat.addEventListener("change", this.callChangeRepeat);
    this.inrangescale.addEventListener("change", this.callChangeScale);

    this.inrangerepeat.value = repeat;
    this.lblrepeat.innerHTML = " " + this.inrangerepeat.value + " x";
    this.inrangescale.value = scale;
    this.lblscale.innerHTML = " " + (this.inrangescale.value * 100) + " %";



}
Stamp.prototype.draw = function() {

    this.ctx.clearRect(0, 0, this.width, this.height);
    //this.stamppixels = app.inspiration.inspirationData.data;


    if (app.inspiration.inspirationData == undefined) {
        this.ctx.drawImage(stamps[this.nr], 0, 0, stamps[this.nr].naturalWidth, stamps[this.nr].naturalHeight, 0, 0, this.width, this.height);
    } else {
        app.stamp.loadStamp(app.inspiration.inspirationData, app.inspiration.selectedRGB)

        //app.stamp.ctx.drawImage(this.stamppixels, 0, 0, app.stamp.naturalWidth, app.stamp.naturalHeight, 0, 0, this.width, this.height);
    }

}

Stamp.prototype.callShowInfo = function() {

    if (app.stamp.infotext.style.display == "none" || app.stamp.infotext.style.display == undefined || app.stamp.infotext.style.display == "") {
        app.stamp.infotext.style.display = "block";
    } else {
        app.stamp.infotext.style.display = "none";
    }
    return app.stop();
}
Stamp.prototype.callHideInfo = function() {

    app.stamp.infotext.style.display = "none";
    return app.stop();

}
Stamp.prototype.callShowInfoStampSize = function() {

    if (app.stamp.infotextstampsize.style.display == "none" || app.stamp.infotextstampsize.style.display == undefined || app.stamp.infotextstampsize.style.display == "") {
        app.stamp.infotextstampsize.style.display = "block";
    } else {
        app.stamp.infotextstampsize.style.display = "none";
    }
    return app.stop();
}
Stamp.prototype.callHideInfoStampSize = function() {


    app.stamp.infotextstampsize.style.display = "none";
    return app.stop();

}
Stamp.prototype.callShowInfoStampBehaviour = function() {
    if (app.stamp.infotextstampbehaviour.style.display == "none" || app.stamp.infotextstampbehaviour.style.display == undefined || app.stamp.infotextstampsize.style.display == "") {
        app.stamp.infotextstampbehaviour.style.display = "block";
    } else {
        app.stamp.infotextstampbehaviour.style.display = "none";
    }
    return app.stop();
}
Stamp.prototype.callHideInfoStampBehaviour = function() {
    app.stamp.infotextstampbehaviour.style.display = "none";
    return app.stop();

}
Stamp.prototype.callChangeStamp = function() {


    app.stamp.ctx.clearRect(0, 0, app.stamp.width, app.stamp.height);
    app.stamp.nr = event.srcElement.alt;
    app.stamp.imgfilter = stamps[app.stamp.nr];
    app.stamp.ctx.drawImage(app.stamp.imgfilter, 0, 0, app.stamp.imgfilter.naturalWidth, app.stamp.imgfilter.naturalHeight, 0, 0, app.stamp.width, app.stamp.height);
    app.stamp.filter = app.stamp.ctx.getImageData(0, 0, app.stamp.width, app.stamp.height); //filter
    return app.stop();

}
Stamp.prototype.callChangeStampSize = function() {

    app.stamp.ctx.clearRect(0, 0, app.stamp.width, app.stamp.height);
    let w = Math.floor(app.stamp.inrangestampwidth.value);
    let h = Math.floor(app.stamp.inrangestampheight.value);
    app.stamp.canvas.width = w * app.dpi;
    app.stamp.canvas.height = h * app.dpi;
    app.stamp.width = w * app.dpi;
    app.stamp.height = h * app.dpi;
    var lblwidth = document.getElementById("lblstampwidth");
    lblwidth.innerHTML = " " + w + " cm";
    var lblheight = document.getElementById("lblstampheight");
    lblheight.innerHTML = " " + h + " cm";
    app.stamp.canvas.style.width = Math.floor(w * (app.scale * 100)) + "px";
    app.stamp.canvas.style.height = Math.floor(h * (app.scale * 100)) + "px";
    app.stamp.ctx = app.stamp.canvas.getContext('2d');
    app.stamp.ctx.drawImage(app.stamp.imgfilter, 0, 0, app.stamp.imgfilter.naturalWidth, app.stamp.imgfilter.naturalHeight, 0, 0, app.stamp.width, app.stamp.height);
    return app.stop();
}

Stamp.prototype.callChangeStampType = function() {


    for (var i = 0; i < 3; i++) {
        if (app.stamp.stamptypes[i].checked) {
            app.stamp.type = app.stamp.stamptypes[i].value;
        }
    }


    app.stamp.ctx.clearRect(0, 0, app.stamp.width, app.stamp.height);

    app.stamp.ctx.drawImage(app.stamp.imgfilter, 0, 0, app.stamp.imgfilter.naturalWidth, app.stamp.imgfilter.naturalHeight, 0, 0, app.stamp.width, app.stamp.height);
    //app.stamp.filter = app.stamp.ctx.getImageData(0, 0, app.stamp.width, app.stamp.height); //filter
    //app.stamp.loadStamp(app.inspiration.inspirationData, app.inspiration.selectedRGB);
    return app.stop();
}
Stamp.prototype.loadStamp = function(inspirationData, argb) {

    this.stampData = this.ctx.createImageData(this.width, this.height); //empty stamp

    for (var i = 0; i < app.inspiration.inspirationData.data.length; i += 4) {
        var rgb = new RGB(app.inspiration.inspirationData.data[i], app.inspiration.inspirationData.data[i + 1], app.inspiration.inspirationData.data[i + 2]);



        if (this.type == "color") {
            var datahue = rgb.hue();
            if (datahue >= (argb.hue() - 20) && datahue <= (argb.hue() + 20) &&
                this.filter.data[i] === 0 && this.filter.data[i + 3] > 0) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }
        if (this.type == "lightness") {
            var datalightness = rgb.lightness();
            if (datalightness >= (argb.lightness() - 10) && datalightness <= (argb.lightness() + 10) && this.filter.data[i] === 0 && this.filter.data[i + 3] > 0) {
                this.stampData.data[i] = inspirationData.data[i];
                this.stampData.data[i + 1] = inspirationData.data[i + 1];
                this.stampData.data[i + 2] = inspirationData.data[i + 2];
                this.stampData.data[i + 3] = this.filter.data[i + 3];
            }
        }
        if (this.type == "copy") {

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
Stamp.prototype.callChangeRepeat = function() {
    app.stamp.lblrepeat.innerHTML = " " + app.stamp.inrangerepeat.value + " x";
    return app.stop();
}
Stamp.prototype.callChangeScale = function() {
    app.stamp.lblscale.innerHTML = " " + (app.stamp.inrangescale.value * 100) + " %";
    return app.stop();
}