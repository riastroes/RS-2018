function preload() {
    images = [];

    images[0] = loadImage("images/deurlinks.png");
    images[1] = loadImage("images/deurrechts.png");


    for (var i = 2; i < 10; i++) {

    }

}
var images;
var scenes;
var open;

function setup() {
    pixelDensity(1);
    var canvas = createCanvas(1000, 800);
    divcanvas = document.getElementById("divcanvas");
    canvas.parent(divcanvas);
    scenes = [];
    open = 0

    images[0].resize(1000, 800);
    images[1].resize(1000, 800);
    frameRate(10);


}

function draw() {
    background(255, 0, 0);


    //open de deuren
    if (open < 500) {
        image(images[0], 0 - open, 0);
        image(images[1], 0 + (open * 2), 0);
        open++;
    }


}