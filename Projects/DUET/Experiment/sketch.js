/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var colors;
var colorstrip;

var offset;
var imgpixels;

var img;
var isfilterd;
var resultimg;
var stamp;

function preload() {
    img = [];
    img[0] = loadImage("images/img5.jpg");
    img[1] = loadImage("images/img2.jpg");
    img[2] = loadImage("images/img3.jpg");
    img[3] = loadImage("images/img4.jpg");
    img[4] = loadImage("images/img5.jpg");

}

function setup() {
    pixelDensity(1);
    canvas = createCanvas(windowWidth, windowHeight);

    img[0].resize(width, height);
    // for (var i = 0; i < 5; i++) {
    //     img[i].resize(width, height);
    // }

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    imgpixels = [];
    stamp = new Stamp(200, 200);
    var hue = 30;
    //getImage();
    //stamp.loadInk(img[0], 300, 300, hue, 100);


    isfilterd = false;
    issaved = false;
}


function draw() {
    //background(255);


    if (stamp.isloaded) {

        stamp.draw(random(-stamp.width, this.width), random(-stamp.height, this.height));
    }


    colorstrip.show();
}

function mousePressed() {
    // var density = (pixels.length / height) / width;
    // var i = (floor(mouseY) * width * density) + (floor(mouseX) * density);
    // var param = rgbToHsl(pixels[i], pixels[i + 1], pixels[i + 2]);

    // colors[0] = color(param[0] * 360, param[1] * 100, param[2] * 100);
    // console.log(density, i, pixels.length);

    // if (!isfilterd) {
    //     myfilter(param[0] * 360);
    // }
    var hue = 0;
    var range = 360;
    stamp.loadInk(img[0], floor(mouseX), floor(mouseY), hue, range);
    //stamp.draw(mouseX, mouseY);

}





function getImage() {

    image(img[0], 0, 0);
    loadPixels();


}