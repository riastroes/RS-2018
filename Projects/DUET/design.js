function Design() {
    this.designpanel = document.getElementById("divdesignframe");
    this.infodesign = document.getElementById("btninfodesign");
    this.infotextdesign = document.getElementById("divinfodesign");
    this.infodesignsteps = document.getElementById("btninfodesignsteps");
    this.infotextdesignsteps = document.getElementById("divinfodesignsteps");


    this.canvas = document.getElementById("canvasdesign");

    this.olddesignwidth;
    this.olddesignwidth;

    this.hruler = new Ruler("h");
    this.vruler = new Ruler("v");

    this.canvasbg = document.createElement("canvas");
    this.canvastemp = document.createElement("canvas");
    this.canvastop = document.getElementById("canvastop");

    this.name = [];
    this.id = [];
    this.dataURL = [];
    this.index = 0;


}
Design.prototype.init = function(w, h) {

        //canvas

        this.canvastop.addEventListener("mousemove", this.callDragStamp);
        this.canvastop.addEventListener("click", this.callStamp);

        this.infodesign.addEventListener("click", this.callToggleInfoDesign);
        this.infotextdesign.addEventListener("click", this.callHideInfoDesign);
        this.infodesignsteps.addEventListener("click", this.callToggleInfoDesignSteps);
        this.infotextdesignsteps.addEventListener("click", this.callHideInfoDesignSteps);


        this.canvas.width = w * app.dpi;
        this.canvas.height = h * app.dpi;

        this.width = w * app.dpi;
        this.height = h * app.dpi;
        this.canvasbg.width = w * app.dpi;
        this.canvasbg.height = h * app.dpi;
        this.canvastemp.width = w * app.dpi;
        this.canvastemp.height = h * app.dpi;
        this.canvastop.width = w * app.dpi;
        this.canvastop.height = h * app.dpi;
        this.canvastop.offsetX = this.canvas.offsetX;
        this.canvastop.offsetY = this.canvas.offsetY;

        //this.canvas.style.width = Math.floor(w * (app.scale * 100)) + "px";
        //this.canvas.style.height = Math.floor(h * (app.scale * 100)) + "px";
        //this.canvastop.style.width = Math.floor(w * (app.scale * 100)) + "px";
        //this.canvastop.style.height = Math.floor(h * (app.scale * 100)) + "px";
        var lblwidth = document.getElementById("lblcanvaswidth");
        lblwidth.innerHTML = " " + w + " cm";
        var lblheight = document.getElementById("lblcanvasheight");
        lblheight.innerHTML = " " + h + " cm";

        this.olddesignwidth = w;
        this.olddesignheight = h;

        this.ctxbg = this.canvasbg.getContext('2d');
        this.ctxtemp = this.canvastemp.getContext('2d');
        this.ctxtop = this.canvastop.getContext('2d');
        this.ctx = this.canvas.getContext('2d');
        this.changeBackgroundColor("#ffffff");
        //rulers
        this.hruler.init(w, 20);
        this.vruler.init(20, h);
        this.hruler.draw();
        this.vruler.draw();
    }
    /* info buttons */
Design.prototype.callToggleInfoDesign = function() {

    if (app.design.infotextdesign.style.display == "none" || app.design.infotextdesign.style.display == undefined || app.design.infotextdesign.style.display == "") {
        app.design.infotextdesign.style.display = "block";
    } else {
        app.design.infotextdesign.style.display = "none";
    }
    return app.stop();
}
Design.prototype.callHideInfoDesign = function() {
    app.design.infotextdesign.style.display = "none";
    return app.stop();
}
Design.prototype.callToggleInfoDesignSteps = function() {

    if (app.design.infotextdesignsteps.style.display == "none" || app.design.infotextdesignsteps.style.display == undefined || app.design.infotextdesignsteps.style.display == "") {
        app.design.infotextdesignsteps.style.display = "block";
    } else {
        app.design.infotextdesignsteps.style.display = "none";
    }
    return app.stop();
}
Design.prototype.callHideInfoDesignSteps = function() {
        app.design.infotextdesignsteps.style.display = "none";
        return app.stop();
    }
    /* end info buttons */
Design.prototype.changeBackgroundColor = function(acolor, isnewdesign) {
    this.ctxbg.fillStyle = acolor;
    this.ctxbg.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.canvasbg, 0, 0); //draw background 
    this.ctx.drawImage(this.canvastemp, 0, 0);
    if (isnewdesign) {
        this.save();
    }

}
Design.prototype.changeCanvasSize = function() {


    let w = Math.floor(app.inrangecanvaswidth.value);
    let h = Math.floor(app.inrangecanvasheight.value);
    app.init(w, h);
    return app.stop();
}
Design.prototype.callDragStamp = function() {
    var scale = app.stamp.inrangescale.value
    var x = event.offsetX - (app.stamp.width * scale / 2);
    var y = event.offsetY - (app.stamp.height * scale / 2);
    app.design.ctxtop.clearRect(0, 0, app.design.canvastop.width, app.design.canvastop.height);
    app.design.ctxtop.drawImage(app.stamp.canvas, 0, 0, app.stamp.width, app.stamp.height, x, y, app.stamp.width * scale, app.stamp.height * scale);
    //app.design.ctxtop.putImageData(app.stamp.stampData, x, y);
    //app.design.ctx.drawImage(app.design.canvastop, 0, 0);

}
Design.prototype.callStamp = function() {
    app.design.ctx.drawImage(app.design.canvasbg, 0, 0); //draw background 

    var imgData = app.design.ctxtemp.createImageData(app.stamp.width, app.stamp.height);

    var x = event.offsetX;
    var y = event.offsetY;
    var repeat = app.stamp.inrangerepeat.value
    var scale = app.stamp.inrangescale.value

    var w = app.design.canvas.width / repeat;
    var px = (x % w) - (app.stamp.width * scale / 2);
    var h = app.design.canvas.height / repeat;
    var py = (y % h) - (app.stamp.height * scale / 2);
    for (var i = -1; i <= repeat; i++) {
        for (var j = -1; j <= repeat; j++) {
            var ax = (i * w) + px;
            var ay = (j * h) + py;
            app.design.ctxtemp.drawImage(app.stamp.canvas, 0, 0, app.stamp.width, app.stamp.height, ax, ay, app.stamp.width * scale, app.stamp.height * scale)
        }
    }
    app.design.ctx.drawImage(app.design.canvastemp, 0, 0);
    app.design.save();
    return app.stop();
}
Design.prototype.restore = function(id, isnewdesign) {
    var img = document.getElementById(id);
    var divimg = document.getElementById("div" + id);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctxtemp.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctxtemp.drawImage(img, 0, 0);
    this.changeBackgroundColor(divimg.style.backgroundColor, false);

}


Design.prototype.save = function() {

    this.dataURL[this.index] = this.canvastemp.toDataURL('image/png', 1.0);
    this.name[this.index] = "DUET-pattern-" + this.index + ".png";
    this.id[this.index] = "DUET" + this.index;
    if (this.dataURL[this.index].length > 0) {
        var adiv = document.createElement("div");
        adiv.className = "rs-frame float";
        var img = document.createElement("img");
        var br = document.createElement("br");

        img.id = this.id[this.index];
        img.alt = this.name[this.index];
        img.src = this.dataURL[this.index];
        img.onclick = function() {
            app.design.restore(this.id, true);
        }
        img.width = 100;
        img.height = 100;

        var divsteps = document.getElementById("divsteps");
        if (divsteps.innerHTML == 0) {
            divsteps.appendChild(adiv)
        } else {
            divsteps.insertBefore(adiv, divsteps.childNodes[0]);
        }

        adiv.style.backgroundColor = this.bgcolor;
        adiv.id = "div" + this.id[this.index];
        adiv.appendChild(img);
        adiv.appendChild(br);

        this.index++;
    }
    app.designismade = true;

}