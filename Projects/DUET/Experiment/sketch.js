/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var colors;
var colorstrip;

var offset;
var imgpixels;

var img;

function preload() {
    img = [];
    img[0] = loadImage("images/img1.jpg");
    img[1] = loadImage("images/img2.jpg");
    img[2] = loadImage("images/img3.jpg");
    img[3] = loadImage("images/img4.jpg");
    img[4] = loadImage("images/img5.jpg");

}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    pixelDensity(4);
    for (var i = 0; i < 5; i++) {
        img[i].resize(width, height);
    }

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    imgpixels = [];


    issaved = false;
}


function draw() {
    //background(255);
    getImage();





    colorstrip.show();
}

function mousePressed() {
    var density = (pixels.length / height) / width;
    var i = (floor(mouseY) * width * density) + (floor(mouseX) * density);
    var param = rgbToHsl(pixels[i], pixels[i + 1], pixels[i + 2]);
    console.log(param);
    colors[0] = color(param[0] * 360, param[1] * 100, param[2] * 100);
    console.log(density, i);

}

function getImage() {
    if (frameCount == 0) {
        image(img[0], 50, 0);
        loadPixels();

    } else if (frameCount == 100) {
        image(img[1], 0, 0);
        loadPixels();

    } else if (frameCount == 200) {
        image(img[2], 0, 0);
        loadPixels();

    } else if (frameCount == 300) {
        image(img[3], 0, 0);
        loadPixels();

    } else if (frameCount == 400) {
        image(img[4], 0, 0);
        loadPixels();

    }
}