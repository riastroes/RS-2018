function Design() {
    this.DUETcanvas =[];
    this.link =[];
    this.index =0;
    this.canvas = document.getElementById("canvasdesign");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.bgcolor ="#ffffff";
    this.patternsize  = 2;
    this.maxpatternsize = 1;
    this.ctx = this.canvas.getContext('2d');

    this.rows = this.patternsize;
    this.cols = this.patternsize;
    this.background(this.bgcolor);
}
Design.prototype.background = function(acolor) {
    this.bgcolor = acolor;
    this.ctx.fillStyle = acolor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}
Design.prototype.resizePattern= function(size){
   if(size == 0){
       this.patternsize = 1;
   }
   else{this.patternsize = parseInt(size);}
   
   var label = document.getElementById("lblpatternsize");
   label.innerHTML =" " + this.patternsize;
   if(this.patternsize > this.maxpatternsize){
       this.maxpatternsize = this.patternsize;
   }
   this.rows = this.patternsize;
   this.cols = this.patternsize;
   this.background(this.bgcolor);
}


Design.prototype.stamp = function() {
    var imgData = this.ctx.createImageData(stamp.width, stamp.height);


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
            var bg = this.ctx.getImageData(ax, ay, stamp.width, stamp.height);
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

            this.ctx.putImageData(imgData, ax, ay);


        }
    }




}
Design.prototype.restore = function(srccanvas){

    
   
    this.cols = this.patternsize;
    this.rows = this.patternsize;
    var ctx = srccanvas.getContext('2d');
    var imgData = ctx.getImageData(0,0,srccanvas.width, srccanvas.height);

    var x = 0;
    var y = 0;

    var w = this.canvas.width / this.cols;
    var px = (x % w) - (srccanvas.width / 2);
    var h = this.canvas.height / this.rows;
    var py = (y % h) - (srccanvas.height / 2);
    for (var i = -1; i <= this.cols; i++) {
        for (var j = -1; j <= this.rows; j++) {
            var ax = (i * w) + px;
            var ay = (j * h) + py;
            
            this.ctx.putImageData(imgData, ax, ay);


        }
    }
}
Design.prototype.save = function() {
    
    var br1 = document.createElement("BR");
    
    var acanvas = document.createElement("canvas");
    
    acanvas.width = this.canvas.width;
    acanvas.height = this.canvas.height
   
    var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    var ctx = acanvas.getContext('2d');
    
    ctx.putImageData(imgData, 0, 0);
    ctx.scale(1/this.patternsize,1/this.patternsize);
    var div  = document.createElement("div");
    div.className ="w3-container";
    this.DUETcanvas[this.index] = document.createElement("canvas");
    this.DUETcanvas[this.index].id ="DUET" + this.index;
    var parent = document.getElementById("divdesigns");
    parent.appendChild(div);
    div.appendChild(this.DUETcanvas[this.index]);
    this.DUETcanvas[this.index].width = Math.floor(acanvas.width/this.patternsize);
    this.DUETcanvas[this.index].height = Math.floor(acanvas.height/this.patternsize);
    var DUETctx = this.DUETcanvas[this.index].getContext('2d');
    DUETctx.drawImage(acanvas,0,0);
    this.DUETcanvas[this.index].onclick = function(){
        
        
        var ps = document.getElementById("inpatternsize");
        ps.value = Math.floor(1000 /event.srcElement.width);
        var lblps = document.getElementById("lblpatternsize");
        lblps.innerHTML = " " + ps.value.toString();
        design.restore(event.srcElement);
        this.patternsize = parseInt(ps.value);
        document.location.href ="#design";
    }
   
    this.link[this.index] = document.createElement('a');
    this.link[this.index].id  = this.index.toString();
    this.link[this.index].className = "rs-button";
    this.link[this.index].href = this.DUETcanvas[this.index].toDataURL('image/jpeg',1.0);
    this.link[this.index].download = "DUET-pattern"+ this.index + ".jpg";
    this.link[this.index].innerHTML = "download DUET-pattern"+ this.index + ".jpg";
    


    div.appendChild(br1);
    div.appendChild(this.link[this.index]);
    
    this.index++;



}