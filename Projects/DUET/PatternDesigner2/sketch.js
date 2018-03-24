/* Ria Stroes */
/* @created: maart 2018  */
;



// inspiration
var inspiration;

// palette;
var palette;

//pattern
var cols;
var rows;

//stamp
var stampmasker;
var stamp;
var stampwidth;
var stampheight;
var lastx, lasty;

//canvas
var design;


function start() {

    inspiration = new Inspiration();
    inspiration.init(images[0], 400, 300);
    palette = new Palette();
    stamp = new Stamp();
    design = new Design();


}


/*

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
    img[8] = loadImage("images/img9.jpg");
    img[9] = loadImage("images/img10.jpg");

    imgstamp = [];

    imgstamp[0] = loadImage("images/rad200x200.png");
    imgstamp[1] = loadImage("images/blob200x200.png");
    imgstamp[2] = loadImage("images/blob2-200x200.png");
    imgstamp[3] = loadImage("images/frame200x200.png");
    imgstamp[4] = loadImage("images/triangle200x200.png");
}


function setup() {
    pixelDensity(1);
    changeSettings();


    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.add(color(0));
    colorstrip.add(color(255));
    //colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    nr = "1";




    issaved = false;
}


function draw() {

    colorstrip.show();
}

function mousePressed() {

    if (mouseButton === LEFT) {
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
    } else if (mouseButton === RIGHT) {
        saveJIPPattern();
    }
    return true;


}


function keyPressed() {
    if (keyCode === BACKSPACE) {
        background(255);
    } else if (keyCode === UP_ARROW) {
        stamp.grow(30);
    } else if (keyCode === DOWN_ARROW) {
        stamp.shrink(30);
    } else if (keyCode === ESCAPE) {
        image(img[2], 0, 0, 1800, 1200);
        noFill();
        stroke(0, 50, 50);
        ellipse(lastx, lasty, 10, 10);
    }
}

function changeSettings() {
    //layout
    var divcanvas = document.getElementById("divcanvas");

    if (canvaswidth == undefined) {
        var layout = document.getElementById("layout");
        layout.style.display = "block";
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

            var x = event.offsetX * 5;
            var y = event.offsetY * 5;

            var i = (floor(y) * inspiration.width * 4) + (floor(x) * 4);


            var param = rgbToHsl(inspiration.pixels[i], inspiration.pixels[i + 1], inspiration.pixels[i + 2]);
            var rgbcolor = color(inspiration.pixels[i], inspiration.pixels[i + 1], inspiration.pixels[i + 2], 255);
            var hslcolor = color(param[0] * 360, param[1] * 100, param[2] * 100);


            var ahue = param[0] * 360;
            var asat = param[1] * 100;
            var alight = param[2] * 100;
            //console.log(x, y, i, ahue );
            var range = 20;
            if (ahue >= 0 && ahue <= 360) {
                colorstrip.add(hslcolor);

                stamp.loadInk(inspiration, floor(x - (stampwidth / 2)), floor(y - (stampheight / 2)), ahue, asat, alight, range);
                stamp.mask(stampmasker);
                stampmasker.loadPixels();

                var ctxsample = canvassample.getContext("2d");


                var stampData = ctxsample.getImageData(0, 0, stampwidth, stampheight);
                for (var i = 0; i < stampData.data.length; i += 4) {
                    stampData.data[i] = 255;
                    stampData.data[i + 1] = 255;
                    stampData.data[i + 2] = 255;
                    stampData.data[i + 3] = 255;
                }

                stamp.getData(stampData);

                ctxsample.putImageData(stampData, 0, 0);
            }




        }
        //pattern
    cols = document.getElementById("inpatterncols").value;
    rows = document.getElementById("inpatternrows").value;

    //stamp


    stampwidth = parseInt(document.getElementById("instampwidth").value);
    stampheight = parseInt(document.getElementById("instampheight").value);
    stamp = new Stamp(stampwidth, stampheight);
    changeStamp("1");

    stampmasker.loadPixels();

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

    var btnstart = document.getElementById("btnstart");
    btnstart.click();
    var btnstamp = document.getElementById("btnstamp");
    btnstamp.click();


}

function changeStamp(nr) {
    var i = parseInt(nr) - 1;

    imgstamp[i].resize(stampwidth, stampheight);
    stampmasker = imgstamp[i];
    stampmasker.loadPixels();

}

function changeInspiration(nr) {
    canvasinspiration = document.getElementById("canvasinspiration");
    canvasinspiration.width = 300;
    canvasinspiration.height = 240;

    var inspiration2 = createGraphics(300, 240);
    inspiration = createGraphics(1500, 1200);

    if (nr === "1") {
        inspiration2.image(img[0], 0, 0, 300, 240);
        inspiration.image(img[0], 0, 0, 1500, 1200);
    } else if (nr === "2") {
        inspiration2.image(img[1], 0, 0, 300, 240);
        inspiration.image(img[1], 0, 0, 1500, 1200);
    } else if (nr === "3") {
        inspiration2.image(img[2], 0, 0, 300, 240);
        inspiration.image(img[2], 0, 0, 1500, 1200);

    } else if (nr === "4") {
        inspiration2.image(img[3], 0, 0, 300, 240);
        inspiration.image(img[3], 0, 0, 1500, 1200);
    } else if (nr === "5") {
        inspiration2.image(img[4], 0, 0, 300, 240);
        inspiration.image(img[4], 0, 0, 1500, 1200);
    } else if (nr === "6") {
        inspiration2.image(img[5], 0, 0, 300, 240);
        inspiration.image(img[5], 0, 0, 1500, 1200);
    } else if (nr === "7") {
        inspiration2.image(img[6], 0, 0, 300, 240);
        inspiration.image(img[6], 0, 0, 1500, 1200);

    } else if (nr === "8") {
        inspiration2.image(img[7], 0, 0, 300, 240);
        inspiration.image(img[7], 0, 0, 1500, 1200);

    } else if (nr === "9") {
        inspiration2.image(img[8], 0, 0, 300, 240);
        inspiration.image(img[8], 0, 0, 1500, 1200);
    } else if (nr === "10") {
        inspiration2.image(img[9], 0, 0, 300, 240);
        inspiration.image(img[9], 0, 0, 1500, 1200);
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

function saveJIPPattern() {
    var timestamp = Math.floor(Date.now() / 1000);
    saveCanvas(canvas, "JIPpattern" + timestamp.toString(), ".jpg");
}

*/