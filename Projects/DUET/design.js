function Design(mwidth) {
    this.width = Math.floor(mwidth - 20);
    this.width += (this.width % 2);
    this.height = this.width;
    this.maxstack = 0;
    this.current = 0;

    this.DUETimg = [];
    this.dataURL = [];
    this.name = [];
    this.link = [];
    this.id = [];
    this.index = 0;
    // var scale = window.devicePixelRatio;
    // console.log(scale);
    // this.pnlcanvas = document.getElementById("paneldesign");
    // this.pnlcanvas.width = this.width;
    // this.pnlcanvas.height = this.height;
    // this.pnlcanvas.style.overflow = "hidden";
    // this.width *= scale;
    // this.height *= scale;
    this.canvas = document.getElementById("canvasdesign");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.bgcanvas = document.createElement("canvas");
    this.bgcanvas.width = this.width;
    this.bgcanvas.height = this.height;
    this.bgctx = this.bgcanvas.getContext('2d');
    this.bgcolor = "#ffffff";
    this.patternsize = 2;
    this.maxpatternsize = 1;
    this.ctx = this.canvas.getContext('2d');
    // this.ctx.scale(scale, scale);
    //this.canvas.onmouseover = this.showView();
    this.rows = this.patternsize;
    this.cols = this.patternsize;

    this.tempcanvas = document.createElement("canvas");
    this.tempcanvas.width = this.canvas.width;
    this.tempcanvas.height = this.canvas.height;
    this.tempcanvas.id = "tempcanvas";
    this.tempctx = this.tempcanvas.getContext('2d');
    this.background(this.bgcolor);

    this.view = document.createElement("canvas");
    this.view.className = "view";
    this.view.width = this.width;
    this.view.height = this.height;
    this.view.style.top = this.canvas.style.top;
    this.view.style.left = this.canvas.style.left;
    this.viewctx = this.view.getContext('2d');

    this.watermark = watermark;

}
Design.prototype.background = function(acolor,isnewdesign) {

    if(isnewdesign){
        this.bgcolor = acolor;
        this.ctx.fillStyle = acolor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.tempcanvas, 0, 0);
        this.save();
    }
    else{
        this.bgcolor = acolor;
        this.ctx.fillStyle = acolor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.tempcanvas, 0, 0);
    }
}      

    // Design.prototype.showView = function() {
    //     var x = event.offsetX;
    //     var y = event.offsetY;

//     design.viewctx.fillStyle = "#ffffffff";
//     design.viewctx.fillRect(0, 0, design.width, design.height);
//     design.viewctx.drawImage(design.canvas, x - (design.width / 2), y - (design.width / 2));
// }
Design.prototype.resizePattern = function(size) {
    if (size == 0) {
        this.patternsize = 1;
    } else { this.patternsize = parseInt(size); }

    var label = document.getElementById("lblpatternsize");
    label.innerHTML = " " + this.patternsize;
    if (this.patternsize > this.maxpatternsize) {
        this.maxpatternsize = this.patternsize;
    }
    this.rows = this.patternsize;
    this.cols = this.patternsize;
    // this.background(this.bgcolor);
    // 
}

Design.prototype.stamp = function() {
    var imgData = this.tempctx.createImageData(stamp.width, stamp.height);

    var x = event.offsetX;
    var y = event.offsetY;

    var w = this.canvas.width / this.cols;
    var px = (x % w) - (stamp.width / 2);
    var h = this.canvas.height / this.rows;
    var py = (y % h) - (stamp.height / 2);
    for (var i = -1; i <= this.cols; i++) {
        for (var j = -1; j <= this.rows; j++) {
            var ax = (i * w) + px;
            var ay = (j * h) + py;
            var bg = this.tempctx.getImageData(ax, ay, stamp.width, stamp.height);
            for (var p = 0; p < bg.data.length; p += 4) {
                if (stamp.stampData.data[p + 3] != 255) {
                    imgData.data[p] = bg.data[p];
                    imgData.data[p + 1] = bg.data[p + 1];
                    imgData.data[p + 2] = bg.data[p + 2];
                    imgData.data[p + 3] = bg.data[p + 3];
                } else if (stamp.stampData.data[p] == 0 && stamp.stampData.data[p + 1] == 0 && stamp.stampData.data[p + 2] == 0 && stamp.stampData.data[p + 3] == 0) {
                    //empty stamp
                    imgData.data[p] = bg.data[p];
                    imgData.data[p + 1] = bg.data[p + 1];
                    imgData.data[p + 2] = bg.data[p + 2];
                    imgData.data[p + 3] = bg.data[p + 3];
                } else {
                    imgData.data[p] = stamp.stampData.data[p];
                    imgData.data[p + 1] = stamp.stampData.data[p + 1];
                    imgData.data[p + 2] = stamp.stampData.data[p + 2];
                    imgData.data[p + 3] = stamp.stampData.data[p + 3];
                }
            }
            this.tempctx.putImageData(imgData, ax, ay);

        }
    }
    this.ctx.drawImage(this.tempcanvas, 0, 0);
    this.save();
   
    // var link = document.getElementById("lnkdownload");
    // link.download = this.name[this.index];
    // link.href = this.dataURL[this.index];


}
Design.prototype.restore = function(id, isnewdesign) {
    var img = document.getElementById(id);
    var divimg = document.getElementById("div" + id);
    design.ctx.clearRect(0, 0, design.canvas.width, design.canvas.height);
    design.tempctx.clearRect(0, 0, design.canvas.width, design.canvas.height);
    design.tempctx.drawImage(img, 0, 0);
    design.background(divimg.style.backgroundColor, isnewdesign);
    //document.href = "#design";
    //var index = parseInt(id.substring(4));

    // var link = document.getElementById("lnkdownload");
    // link.download = design.name[index];
    // link.href = design.dataURL[index];
}


Design.prototype.save = function() {

    this.dataURL[this.index] = this.tempcanvas.toDataURL('image/png', 1.0);
    this.name[this.index] = "DUET-pattern-" + this.index + ".png";
    this.id[this.index] = "DUET" + this.index;
    if (this.dataURL[design.index].length > 0) {
        var adiv = document.createElement("div");
        adiv.className = "rs-frame float";
        var img = document.createElement("img");
        var br1 = document.createElement("br");

        img.id = this.id[this.index];
        img.alt = this.name[this.index];
        img.src = this.dataURL[this.index];
        img.onclick = function() {
            design.restore(this.id, true);
        }
        img.width = 100;
        img.height = 100;

        var divdesigns = document.getElementById("divdesignsteps");
        divdesigns.appendChild(adiv);
        adiv.style.backgroundColor = this.bgcolor;
        adiv.id = "div" + this.id[this.index];
        adiv.appendChild(img);
        adiv.appendChild(br1);

        this.index++;
    }

}
Design.prototype.addWatermark = function(){
    this.ctx.drawImage(this.watermark, 0, 0 ,400,300);
}
Design.prototype.sendPattern = function(user, useremail){

    this.restore(this.id[this.index-1], false);
}