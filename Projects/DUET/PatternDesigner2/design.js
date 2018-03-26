function Design() {
    this.canvas = document.getElementById("canvasdesign");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.ctx = this.canvas.getContext('2d');

    this.rows = 2;
    this.cols = 2;
}
Design.prototype.background = function(acolor) {
    this.ctx.fillStyle = acolor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
            var bg = this.ctx.getImageData(ax,ay, stamp.width, stamp.height);
            for(var p = 0; p < bg.data.length;p+=4){
                if(stamp.stampData.data[p+3] != 255){
                    imgData.data[p] = bg.data[p];
                    imgData.data[p+1] = bg.data[p+1];
                    imgData.data[p+2] = bg.data[p+2];
                    imgData.data[p+3] = bg.data[p+3];
                }
                else if(stamp.stampData.data[p] ==0 && stamp.stampData.data[p+1] ==0 && stamp.stampData.data[p+2] ==0 && stamp.stampData.data[p+3] ==0 ){
                    //empty stamp
                    imgData.data[p] = bg.data[p];
                    imgData.data[p+1] = bg.data[p+1];
                    imgData.data[p+2] = bg.data[p+2];
                    imgData.data[p+3] = bg.data[p+3];
               }
                else {
                    imgData.data[p] = stamp.stampData.data[p];
                    imgData.data[p+1] = stamp.stampData.data[p+1];
                    imgData.data[p+2] = stamp.stampData.data[p+2];
                    imgData.data[p+3] = stamp.stampData.data[p+3];
                }
            }
            
            this.ctx.putImageData(imgData, ax, ay);
            

        }
    }
    
   


}
Design.prototype.save = function(){
    var acanvas = document.createElement("canvas");
    var parent = document.getElementById("divdesigns");
    acanvas.parent(parent);
    acanvas.width   =500;
    acanvas.height = 500;
    var ctx = acanvas.getContext('2d');
    ctx.fillStyle = "ff0000";
    ctx.fillRect(0, 0, acanvas.width, acanvas.height);

}