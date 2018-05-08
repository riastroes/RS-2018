function Ruler(type) {
    this.type = type;
    this.canvas = document.getElementById("canvas" + this.type + "ruler");


}
Ruler.prototype.init = function(w, h) {

    if (this.type == "h") {
        this.canvas.width = (w * app.dpi) + 21;
        this.canvas.height = 20;
        this.width = (w * app.dpi) + 21;
        this.height = 20;
        //this.canvas.style.width = Math.floor(w * (app.scale * 100)) + "px";
        //this.canvas.style.height = "20px";
    } else {
        this.canvas.width = 20;
        this.canvas.height = (h * app.dpi) + 1;
        this.width = 20;
        this.height = (h * app.dpi) + 1;
        //this.canvas.style.width = "20px";
        //this.canvas.style.height = Math.floor(h * (app.scale * 100)) + "px";
    }

    this.ctx = this.canvas.getContext('2d');
    //this.ctx.scale((300 / 118) / 10, (300 / 118) / 10);
}
Ruler.prototype.draw = function() {

    this.ctx.beginPath();
    var cm;

    this.ctx.font = 'italic 20px Arial';

    if (this.type == "h") {
        cm = 1;
        this.ctx.fillText("cm", 2, 14);

        for (var i = app.dpi; i <= this.width; i += app.dpi) {
            this.ctx.fillText(cm, i - 2, 15)
            this.ctx.moveTo(i + 20, 0);
            this.ctx.lineTo(i + 20, this.height);
            cm += 1;
        }
        this.ctx.moveTo(0, 20);
        this.ctx.lineTo(this.width, 20);
    } else {
        cm = 1;
        for (var i = app.dpi; i < this.height; i += app.dpi) {

            this.ctx.fillText(cm, 5, i - 10);
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.width, i);
            cm += 1;
        }
        this.ctx.moveTo(20, 0);
        this.ctx.lineTo(20, this.height);
    }

    this.ctx.stroke();
}