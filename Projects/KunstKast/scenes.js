/*************  scene 3 ***********************/
function Scene3(titel, start, stop, conditie) {

    this.title = titel;
    this.start = start;
    this.stop = stop;
    this.steps = stop - start;
    this.step = 0;

    this.condition = conditie;


    this.mieroproos = createVideo("videos/mieroproos.mp4", this.loadVideo);
    this.mieroproos.size(width, height);

    this.mieroproos.preload = "auto";
    this.mieroproos.play();
    this.mieroproos.hide();

    this.gp = createGraphics(width, height);
    this.gp.pixelDensity(1);


}
Scene3.prototype.show = function() {
    if (eval(this.condition)) {
        this.update();

    }
}
Scene3.prototype.update = function() {

    this.step++
        this.gp.image(this.mieroproos, 0, 0, width, height);
    this.gp.loadPixels();
    if (this.step < 200) {
        image(this.gp, 0, 0);
    }

    var stepSize = constrain(dist(width / 2, height / 2, mouseX, mouseY), 0, 32);
    for (var y = 0; y < height; y += stepSize) {
        for (var x = 0; x < width; x += stepSize) {
            var i = y * width + x;
            var darkness = (255 - this.gp.pixels[(i + 2) * 4]) / 255;
            var radius = stepSize * darkness;
            fill(this.gp.pixels[(i * 4)], this.gp.pixels[(i * 4) + 1], this.gp.pixels[(i * 4) + 2], 255);
            ellipse(x, y, radius, radius);
        }
    }

}

Scene3.prototype.loadVideo = function() {
    scenes[3].mieroproos.play();
    //createSnapShot();
}
Scene3.prototype.createSnapShot = function() {
    var htmlcanvas = document.getElementById("defaultCanvas0");
    var snap = htmlcanvas.toDataURL('image/png', 1.0);
    shots[i].src = snap;
    showSnapShot(3, this.Title, snap);
}
Scene3.prototype.toggleVideo = function() {
        if (playing) {
            fingers.pause();
            button.html('play');
        } else {
            fingers.loop();
            button.html('pause');
        }
        playing = !playing;
    }
    /*************  scene 2 ***********************/
function Scene2(titel, start, stop, conditie) {

    this.title = titel;
    this.start = start;
    this.stop = stop;
    this.steps = stop - start;
    this.step = 0;

    this.condition = conditie;



    this.hond = images[4];
    this.negatievehond = images[5];
    this.hond.resize(width, height);
    this.negatievehond.resize(width, height);
    this.rot = 0;
    this.scale = 0;


}
Scene2.prototype.show = function() {
    if (eval(this.condition)) {
        this.update();
        this.draw();
    }
}
Scene2.prototype.update = function() {

    this.start++;
    this.step += 2;

    if (this.step == 500) {
        createSnapShot();
    }

}

Scene2.prototype.draw = function() {

    background(255, 255, 255);
    image(this.negatievehond, 0, 0);
    if (this.step > 550) {
        var a = this.step - 550;
        image(this.hond, a, 0, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 500) {
        var a = this.step - 500;
        image(this.hond, a, a, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 400) {
        var a = this.step - 400;
        image(this.hond, 0, a, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 300) {
        var a = this.step - 300
        image(this.hond, 0, -a, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 200) {
        var a = this.step - 200
        image(this.hond, a, 0, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 100) {
        var a = this.step - 100
        image(this.hond, -a, -a, this.hond.width, this.hond.height, 0, 0, width, height);
    }
    if (this.step > 0 && this.step < 600) {
        image(this.hond, 0, 0, this.hond.width, this.hond.height, 0, 0, width, height);
    } else if (this.step < 650) {
        var a = this.step - 600;
        image(this.hond, 0, 0, this.hond.width, this.hond.height, a, a, width - (2 * a), height - (2 * a));
    } else {
        push();
        translate(width / 2, height / 2);
        rotate(this.rot);
        scale(this.scale);
        image(this.negatievehond, 0, 0, this.negatievehond.width, this.negatievehond.height, -width / 2, -height / 2, width - (2 * a), height - (2 * a));
        this.rot += 0.1;
        this.scale -= 0.01;
        pop();
    }
}
Scene2.prototype.createSnapShot = function() {
        var htmlcanvas = document.getElementById("defaultCanvas0");
        var snap = htmlcanvas.toDataURL('image/png', 1.0);
        shots[i].src = snap;
        showSnapShot(2, this.Title, snap);
    }
    /******************scene 1 ********/

function Scene1(titel, start, stop, conditie) {
    this.title = titel;
    this.start = start;
    this.stop = stop;
    this.steps = stop - start;
    this.step = 0;

    this.condition = conditie;

    this.open = 0;
    this.ldoor = images[0];
    this.rdoor = images[1];
    this.ldoor.resize(width, height);
    this.rdoor.resize(width, height);
    this.wiel = new Wiel();

}
Scene1.prototype.show = function() {
    if (eval(this.condition)) {
        this.update();
        this.draw();
    }
}
Scene1.prototype.update = function() {
    this.open += 2;
    this.step += 1;

    if (this.step == 500) {
        createSnapShot();
    }
}
Scene1.prototype.draw = function() {
    if (this.step < 100) {
        //achtergrond rood
        background(255, 0, 0);
    } else if (this.step < this.steps - 100) {
        //achtergrond wordt lichter
        var gb = map(this.step, 100, this.steps - 100, 0, 255);
        background(255, gb, gb);
        textFont("Chicle");
        gb = map(this.step, 100, this.steps - 100, 255, 0);
        fill(255, gb, gb);
        var size = map(this.step, 100, this.steps - 100, 0, 120);
        textSize(size);
        textAlign(CENTER);
        text("Er waren eens", width / 2, (height / 2) - 100);
        gb = map(this.step, 100, this.steps - 100, 255, 0)
        fill(255, gb, gb);
        text("...", width / 2, height / 2);
    } else {
        var gb = map(this.step, this.steps - 100, this.steps, 0, 255);
        fill(255, gb, gb);
        text("Er waren eens", width / 2, (height / 2) - 100);
        fill(255, 0, 0);
        text("...", width / 2, height / 2);
    }

    this.wiel.draw((width / 2) - (50 + this.open), (height / 2) + 350);
    image(this.ldoor, 0 - this.open, 0);
    image(this.rdoor, 0 + this.open, 0);
}
Scene1.prototype.createSnapShot = function() {
    var htmlcanvas = document.getElementById("defaultCanvas0");
    var snap = htmlcanvas.toDataURL('image/png', 1.0);
    shots[i].src = snap;
    showSnapShot(1, this.Title, snap);
}