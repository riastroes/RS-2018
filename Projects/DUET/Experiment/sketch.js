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
var softborder;

function changeSettings() {
    alert("hoi");
    var canvaswidth = document.getElementById("incanvaswidth")
    var canvasheight = document.getElementById("incanvasheight")
    canvas = createCanvas(parseInt(canvaswidth.value), parseInt(canvasheight.value));
    background(30, 50, 50);
}

function preload() {
    img = [];
    img[0] = loadImage("images/img6.jpg");
    img[1] = loadImage("images/img2.jpg");
    img[2] = loadImage("images/img3.jpg");
    img[3] = loadImage("images/img4.jpg");
    img[4] = loadImage("images/img5.jpg");
    img[5] = loadImage("images/img6.jpg");
    softborder = loadImage("images/softborder200x200.png");
}

function setup() {
    pixelDensity(1);
    canvas = createCanvas(windowWidth - 400, windowHeight);
    var td = document.getElementById("tdcanvas");
    canvas.parent(td);

    img[0].resize(width, height);
    imageMode(CENTER);
    image(img[0], width / 2, height / 2);
    loadPixels();
    background(255);
    var imginspiration = document.getElementById("imgInspiration");
    imginspiration.src = "images/img8.jpg";
    imginspiration.width = 360;
    imginspiration.height = auto;


    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    //colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    imgpixels = [];
    stamp = new Stamp(200, 200);



    isfilterd = false;
    issaved = false;
}


function draw() {
    //background(255);


    if (stamp.isloaded) {

        //stamp.draw(random(-stamp.width/2, this.width + (stamp.width/2)), random(-stamp.height/2, this.height+(stamp.height/2)));
    }


    colorstrip.show();
}

function mousePressed() {
    stamp.draw(mouseX, mouseY);

}


function keyPressed() {
    if (keyCode === SHIFT) {
        var i = (floor(mouseY) * this.width * 4) + (floor(mouseX) * 4);
        console.log(i);
        img[0].loadPixels();

        var param = rgbToHsl(img[0].pixels[i], img[0].pixels[i + 1], img[0].pixels[i + 2]);
        var rgbcolor = color(img[0].pixels[i], img[0].pixels[i + 1], img[0].pixels[i + 2], 255);
        var hslcolor = color(param[0] * 360, param[1] * 100, param[2] * 100);
        colorstrip.add(hslcolor);
        console.log(hue(rgbcolor), hue(hslcolor));
        var ahue = hue(hslcolor);
        var range = 10;

        stamp.loadInk(img[0], floor(mouseX), floor(mouseY), ahue, range);
        stamp.mask(softborder);

    } else if (keyCode === BACKSPACE) {
        background(255);
    } else if (keyCode === UP_ARROW) {
        stamp.grow(10);
    } else if (keyCode === DOWN_ARROW) {
        stamp.shrink(10);
    }
}