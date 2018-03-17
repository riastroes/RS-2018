/* Ria Stroes */
/* @updated: september 2017  */



var issaved;
var colors;
var colorstrip;

var offset;
var imgpixels;

var img;

var isfilterd;
var resultimg;

var softborder;
var canvasinspiration;
var inspiration;
var oldnr, nr;

//canvas
var canvas;
var oldcanvaswidth, canvaswidth;
var oldcanvasheight, canvasheight;

//pattern
var cols;
var rows;

//stamp
var stamp;
var stampwidth;
var stampheight;

var canvassample;

function changeSettings() {
    //layout
    if (canvaswidth == undefined) {
        var layout = document.getElementById("layout");
        layout.style.display = "block";
        var divcanvas = document.getElementById("divcanvas");
        divcanvas.style.width = (windowWidth - 400) + "px";
        divcanvas.style.height = (windowHeight) + "px";
    }

    //canvas
    canvaswidth = parseInt(document.getElementById("incanvaswidth").value);
    canvasheight = parseInt(document.getElementById("incanvasheight").value);
    if (canvaswidth != oldcanvaswidth) {
        oldcanvaswidth = canvaswidth;
        oldcanvasheight = canvasheight;
        canvas = createCanvas(canvaswidth, canvasheight);
        canvas.parent(divcanvas);
    }

    //inspirational image
    if (nr == undefined) {
        changeInspiration(1);
        oldnr = 1;
    } else if (oldnr !== nr) {
        changeInspiration(nr);
        oldnr = nr;
    }



    canvasinspiration.onclick = function() {
            var x = event.offsetX - 10;
            var y = event.offsetY - 20
                //
            var i = (floor(x) * this.width * 4) + (floor(x) * 4);
            console.log(x, y, i);

            var param = rgbToHsl(inspiration.pixels[i], inspiration.pixels[i + 1], inspiration.pixels[i + 2]);
            var rgbcolor = color(inspiration.pixels[i], inspiration.pixels[i + 1], inspiration.pixels[i + 2], 255);
            var hslcolor = color(param[0] * 360, param[1] * 100, param[2] * 100);


            var ahue = hue(hslcolor);
            var range = 30;
            if (ahue >= 0 && ahue <= 360) {
                colorstrip.add(hslcolor);
                var x = map(x, 0, canvasinspiration.width, 0, inspiration.width);
                var y = map(y, 0, canvasinspiration.height, 0, inspiration.height);
                stamp.loadInk(inspiration, floor(x), floor(y), ahue, range);
                stamp.mask(softborder);

                var ctxsample = canvassample.getContext("2d");

                var imgData = ctxsample.getImageData(0, 0, stampwidth, stampheight);
                for (var i = 0; i < imgData.data.length; i += 4) {
                    imgData.data[i] = 255;
                    imgData.data[i + 1] = 255;
                    imgData.data[i + 2] = 255;
                    imgData.data[i + 3] = 255;
                }
                stamp.getData(imgData);
                ctxsample.putImageData(imgData, 0, 0);
            }




        }
        //pattern
    cols = document.getElementById("inpatterncols").value;
    rows = document.getElementById("inpatternrows").value;

    //stamp


    stampwidth = parseInt(document.getElementById("instampwidth").value);
    stampheight = parseInt(document.getElementById("instampheight").value);
    stamp = new Stamp(stampwidth, stampheight);

    canvassample = document.getElementById("canvassample");
    canvassample.width = stampwidth;
    canvassample.height = stampheight;

    var ctxsample = canvassample.getContext("2d");

    var imgData = ctxsample.getImageData(0, 0, stampwidth, stampheight);
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255;
        imgData.data[i + 1] = 255;
        imgData.data[i + 2] = 255;
        imgData.data[i + 3] = 255;
    }
    ctxsample.putImageData(imgData, 0, 0);




}

function changeInspiration(nr) {
    canvasinspiration = document.getElementById("canvasinspiration");
    canvasinspiration.width = 360;
    canvasinspiration.height = 240;

    var inspiration2 = createGraphics(360, 240);
    inspiration = createGraphics(3600, 2400);

    if (nr === "1") {
        inspiration2.image(img[0], 0, 0, 360, 240);
        inspiration.image(img[0], 0, 0, 3600, 2400);
    } else if (nr === "2") {
        inspiration2.image(img[1], 0, 0, 360, 240);
        inspiration.image(img[1], 0, 0, 3600, 2400);
    } else if (nr === "3") {
        inspiration2.image(img[2], 0, 0, 360, 240);
        inspiration.image(img[2], 0, 0, 3600, 2400);
    } else if (nr === "4") {
        inspiration2.image(img[3], 0, 0, 360, 240);
        inspiration.image(img[3], 0, 0, 3600, 2400);
    } else if (nr === "5") {
        inspiration2.image(img[4], 0, 0, 360, 240);
        inspiration.image(img[4], 0, 0, 3600, 2400);
    } else if (nr === "6") {
        inspiration2.image(img[5], 0, 0, 360, 240);
        inspiration.image(img[5], 0, 0, 3600, 2400);
    } else if (nr === "7") {
        inspiration2.image(img[6], 0, 0, 360, 240);
        inspiration.image(img[6], 0, 0, 3600, 2400);

    } else if (nr === "8") {
        inspiration2.image(img[7], 0, 0, 360, 240);
        inspiration.image(img[7], 0, 0, 3600, 2400);
    }
    inspiration2.loadPixels();
    inspiration.loadPixels();

    //var imginspiration = document.getElementById("inspiration");

    var ctx = canvasinspiration.getContext("2d");
    var imgData = ctx.getImageData(0, 0, canvasinspiration.width, canvasinspiration.height);

    for (var i = 0; i < imgData.data.length; i++) {
        imgData.data[i] = inspiration2.pixels[i];
    }
    ctx.putImageData(imgData, 0, 0);




}

function preload() {
    img = [];
    img[0] = loadImage("images/img1.jpg");
    img[1] = loadImage("images/img2.jpg");
    img[2] = loadImage("images/img3.jpg");
    img[3] = loadImage("images/img4.jpg");
    img[4] = loadImage("images/img5.jpg");
    img[5] = loadImage("images/img6.jpg");
    img[6] = loadImage("images/img7.jpg");
    img[7] = loadImage("images/img8.jpg");

    softborder = loadImage("images/softborder200x200.png");
    //softborder = loadImage("images/triangle200x200.png");
}

function setup() {
    pixelDensity(1);
    changeSettings();

    var imginspiration = document.getElementById("imgInspiration");

    // imginspiration.src =  "images/img6.jpg";
    // imginspiration.width = 300;



    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    //colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    imgpixels = [];




    isfilterd = false;
    issaved = false;
}


function draw() {
    //background(255);


    // if (stamp.isloaded) {

    //stamp.draw(random(-stamp.width/2, this.width + (stamp.width/2)), random(-stamp.height/2, this.height+(stamp.height/2)));
    //}


    colorstrip.show();
}

function mousePressed() {
    if ((mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < 50)) {
        background(colorstrip.getColor(mouseX, mouseY));
    } else if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        var w = canvas.width / cols;
        var px = (mouseX % w) - (stampwidth / 2);
        var h = canvas.height / rows;
        var py = (mouseY % h) - (stampheight / 2);
        for (var i = -1; i <= cols; i++) {
            for (var j = -1; j <= rows; j++) {
                stamp.draw((j * w) + px, (i * h) + py);
            }
        }

    }


}


function keyPressed() {
    if (keyCode === BACKSPACE) {
        background(255);
    } else if (keyCode === UP_ARROW) {
        stamp.grow(10);
    } else if (keyCode === DOWN_ARROW) {
        stamp.shrink(10);
    }
}