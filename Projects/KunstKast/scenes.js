/*************  scene 3 ***********************/
function Scene3(titel, start, stop, conditie) {

    this.title = titel;
    this.start = start;
    this.stop = stop;
    this.steps = stop - start;
    this.step = 0;
    this.lblstep = document.getElementById("lblstep");


    this.condition = conditie;


    this.mieroproos = createVideo("videos/mieroproos.mp4", this.loadVideo);
    this.mieroproos.size(width, height);

    this.mieroproos.preload = "auto";
    this.mieroproos.loop();
    this.mieroproos.hide();

    this.gp = createGraphics(width, height);
    this.gp.pixelDensity(1);
    this.a = 0;

}
Scene3.prototype.show = function() {
    if (eval(this.condition)) {
        this.update();
    }
    if (this.step == 200) {
        this.title = "Verstipt";
        this.createSnapShot();
    }
    if (this.step == 500) {
        this.title = "Mier op roos";
        this.createSnapShot();
    }
}
Scene3.prototype.update = function() {
    var d = createVector(width / 2, height / 2);

    this.step++
        this.lblstep.innerHTML = this.step;
    this.gp.image(this.mieroproos, 0, 0, width, height);
    this.gp.loadPixels();
    if (this.step < 1) {
        fill(255, 255);
        rect(0, 0, width, height);
    } else {


        if (this.step > 200) {

            image(this.gp, 0, 0);

        }


        var stepSize = floor(map((mouseX - (width / 2)), -(width / 2), (width / 2), 10, 32));
        stepSize = constrain(stepSize, 10, 32);
        for (var y = 0; y < height; y += stepSize) {
            for (var x = 0; x < width; x += stepSize) {
                var i = (y * width * 4) + (x * 4);
                if (x > 2) {
                    if (this.gp.pixels[i] + this.gp.pixels[i + 1] + this.gp.pixels[i + 2] < 120) {
                        //donkere kleuren
                        stroke(this.gp.pixels[i], this.gp.pixels[i + 1], this.gp.pixels[i + 2], 255 - (this.step));
                        fill(this.gp.pixels[i], this.gp.pixels[i + 1], this.gp.pixels[i + 2], 10);
                        ellipse(x, y, stepSize, stepSize);
                    } else if (this.gp.pixels[i] > 180 && this.gp.pixels[i + 1] + this.gp.pixels[i + 2] < 50) {
                        //rode kleuren
                        fill(this.gp.pixels[i], this.gp.pixels[i + 1], this.gp.pixels[i + 2], 20);
                        stroke(50, 0, 0, stepSize * 8);
                        ellipse(x, y, stepSize, stepSize);
                    } else {
                        //lichte kleuren
                        fill(this.gp.pixels[i], this.gp.pixels[i + 1], this.gp.pixels[i + 2], 255 - (this.step));
                        stroke(this.gp.pixels[i], this.gp.pixels[i + 1], this.gp.pixels[i + 2], 255 - (this.step));
                        ellipse(x, y, stepSize, stepSize);
                    }
                }
            }
        }
        this.a += 20;
    }
    if (this.step == 500) {
        this.mieroproos.stop();
        this.mieroproos.loop();
    }
}

Scene3.prototype.loadVideo = function() {
    scenes[3].mieroproos.play();
    //createSnapShot();
}
Scene3.prototype.createSnapShot = function(titel) {
    var htmlcanvas = document.getElementById("defaultCanvas0");
    var snap = htmlcanvas.toDataURL('image/png', 1.0);
    showSnapShot(3, titel, snap);
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
        this.createSnapShot();
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
        showSnapShot(2, this.title, snap);
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
    this.oepsie = images[6];

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

    if (this.step == 450) {
        this.createSnapShot();
    }
}
Scene1.prototype.draw = function() {

    if (this.step < this.steps - 200) {
        //achtergrond wordt lichter
        var gb = map(this.step, 100, this.steps - 100, 0, 255);
        background(255, gb, gb);
        textFont("Chicle");

        fill(255, 0, 0); //rood
        this.size = map(this.step, 0, this.steps - 100, 0, 120);
        textSize(this.size);
        textAlign(CENTER);
        text("Er waren eens", width / 2, (height / 2) - 100);
        gb = map(this.step, 100, this.steps - 100, 255, 0)
        fill(255, gb, gb);
        text(". . .", width / 2, height / 2);
    } else if (this.step < this.steps - 100) {
        background(255, 255, 255);
        imageMode(CENTER);
        fill(255, 0, 0);
        this.size += 10;
        textSize(this.size);
        text(". . .", width / 2, height / 2);
        //image(this.oepsie, width / 2, height / 2, this.size / 2, this.size / 2);

    } else if (this.step < this.steps) {
        background(255, 255, 255);
        imageMode(CENTER);
        fill(255, 0, 0);
        this.size += 10;
        textSize(this.size);
        text(". . .", width / 2, height / 2);
        image(this.oepsie, width / 2, height / 2, this.size / 2, this.size / 2);
    }

    this.wiel.draw((width / 2) - (50 + this.open), (height / 2) + 350);
    image(this.ldoor, 0 - this.open, 0);
    image(this.rdoor, 0 + this.open, 0);

}
Scene1.prototype.createSnapShot = function() {
    var htmlcanvas = document.getElementById("defaultCanvas0");
    var snap = htmlcanvas.toDataURL('image/png', 1.0);
    showSnapShot(1, this.title, snap);
}