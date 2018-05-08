function Intro(w, h) {
    this.canvas = document.getElementById("canvasanimation");
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.width = w;
    this.height = h;
    this.ctx = this.canvas.getContext('2d');
}
Intro.prototype.init = function() {
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.img = document.createElement("IMG");
    this.img.src = "images/stampie.jpg";
    window.requestAnimationFrame(app.intro.draw);
}
Intro.prototype.update = function() {
    app.intro.x = Math.floor(Math.random() * app.intro.width - 100);
    app.intro.y = Math.floor(Math.random() * app.intro.height - 100);
    app.intro.r += 0.1
}
Intro.prototype.draw = function() {
    app.intro.ctx.globalCompositeOperation = 'destination-over';
    app.intro.ctx.save();
    app.intro.update();
    app.intro.ctx.translate(app.intro.x + 50, app.intro.y + 50);
    app.intro.ctx.rotate(app.intro.r)
    app.intro.ctx.drawImage(app.intro.img, 0, 0, 20, 20);
    app.intro.ctx.restore();
    window.requestAnimationFrame(app.intro.draw);
}