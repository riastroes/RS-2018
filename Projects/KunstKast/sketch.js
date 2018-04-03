function preload() {
    images = [];

    images[0] = loadImage("images/deurlinks.png");
    images[1] = loadImage("images/deurrechts.png");
    images[2] = loadImage("images/wiel.png")
    images[3] = loadImage("images/handel.png")


}
var canvas;
var images;
var scenes;
var open;
var wiel;
var shots;

function setup() {
    pixelDensity(1);
    canvas = createCanvas(1000, 800);
    var divcanvas = document.getElementById("divcanvas");
    canvas.parent(divcanvas);
    scenes = [];
    shots = [];
    open = 0;

    images[0].resize(1000, 800);
    images[1].resize(1000, 800);

    wiel = new Wiel();

    textFont("Chicle");
    frameRate(20);
}

function draw() {



    //open de deuren
    if (open < 700) {
        if (open > 200) {
            var gb = map(open, 200, 700, 0, 255);
            background(255, gb, gb);
        } else {
            background(255, 0, 0);
        }

        if (open > 100) {
            var gb = map(open, 100, 700, 0, 255);
            fill(255, open - 200, open - 200);
            var size = map(open, 100, 700, 0, 120);
            textSize(size);
            textAlign(CENTER);
            text("Er waren eens", 500, 400);
            gb = map(open, 100, 700, 255, 0)
            fill(255, gb, gb);
            text("...", 500, 500);
        }


        wiel.draw(530 - (open), 636);
        image(images[0], 0 - open, 0);
        image(images[1], 0 + open, 0);
        if (open == 500) {
            createSnapShot(0);
        }
        open += 2;


    }


}

function createSnapShot(i) {
    var div = document.getElementById("snapshots");
    if (i == 0) {
        var comment = document.getElementById("comment")
        comment.innerHTML = "Er valt nog veel meer te ontdekken ...";
    }
    shots[i] = document.createElement("canvas");
    shots[i].width = 1000;
    shots[i].height = 800;
    shots[i].className = "thumbnail";
    div.appendChild(shots[i]);
    var divcanvas = document.getElementById("defaultCanvas0");
    var canvasctx = divcanvas.getContext('2d');
    var ctx = shots[i].getContext('2d');
    var dataImg = canvasctx.getImageData(0, 0, 1000, 800);


    ctx.putImageData(dataImg, 0, 0);

}