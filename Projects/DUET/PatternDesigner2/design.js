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
    var x = event.offsetX;
    var y = event.offsetY;

    var w = this.canvas.width / this.cols;
    var px = (x % w) - (stamp.width / 2);
    var h = this.canvas.height / this.rows;
    var py = (y % h) - (stamp.height / 2);
    for (var i = -1; i <= this.cols; i++) {
        for (var j = -1; j <= this.rows; j++) {
            var ax = (j * w) + px;
            var ay = (i * h) + py;
            this.ctx.putImageData(stamp.imgData, ax, ay);

        }
    }


}