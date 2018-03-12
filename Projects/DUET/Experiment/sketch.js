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
    resultimg = createImage(width,height);
    resultimg.loadPixels();
    for (var i = 0; i < resultimg.width; i++) {
        for (var j = 0; j < resultimg.height; j++) {
            resultimg.set(i, j, color(0, 0, 0));
        }
    }
    resultimg.updatePixels();


    isfilterd = false;
    issaved = false;
}


function draw() {
    //background(255);
    getImage();

    //if(frameCount %100 == 1){
        var hue = map(frameCount % 144, 0, 144, 0,360)
        myfilter(hue);
        console.log(frameCount);
    //}
   
    
    colorstrip.show();
}

function mousePressed() {
    var density = (pixels.length / height) / width;
    var i = (floor(mouseY) * width * density) + (floor(mouseX) * density);
    var param = rgbToHsl(pixels[i], pixels[i + 1], pixels[i + 2]);
    
    colors[0] = color(param[0] * 360, param[1] * 100, param[2] * 100);
    console.log(density, i, pixels.length);

    if(!isfilterd){
        myfilter(param[0]*360);
    }

}
function myfilter(hue){
    
    resultimg.loadPixels();
    

    
    var param = [];
    var rgb = [];
    for(var i = 0; i < pixels.length; i+=4){
        param = rgbToHsl(pixels[i], pixels[i + 1], pixels[i + 2]);
        if( (param[0]*360) >= hue && (param[0]*360) < hue+10){
            param[0] = (hue/360);
            //param[1] = 1;
           // param[2] = 50;
            rgb = hslToRgb(param[0], param[1], param[2]);
            resultimg.pixels[i] = rgb[0];
            resultimg.pixels[i+1] = rgb[1];
            resultimg.pixels[i+2] = rgb[2];
            resultimg.pixels[i+3] = 255;
            
        }
    }
    resultimg.updatePixels();
    //background(255);
    image(resultimg, 0, 0);
    isfilterd = true;
}
function getImage() {
    if (frameCount % 300 == 1) {
        image(img[0], 0, 0);
        loadPixels();
        background(255);
        isfilterd = false;
    }
    // else if (frameCount == 100) {
    //     image(img[1], 0, 0);
    //     loadPixels();

    // } else if (frameCount == 200) {
    //     image(img[2], 0, 0);
    //     loadPixels();

    // } else if (frameCount == 300) {
    //     image(img[3], 0, 0);
    //     loadPixels();

    // } else if (frameCount == 400) {
    //     image(img[4], 0, 0);
    //     loadPixels();

    // }
}