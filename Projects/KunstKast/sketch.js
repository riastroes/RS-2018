function preload() {
    images = [];
    //scene 1
    images[0] = loadImage("images/deurlinks.png");
    images[1] = loadImage("images/deurrechts.png");
    images[2] = loadImage("images/wiel.png");
    images[3] = loadImage("images/handel.png");
    //scene 2
    images[4] = loadImage("images/hond.png");
    images[5] = loadImage("images/negatievehond.png");



}
var canvas;
var images;
var scenes;

var wiel;
var shots;

function setup() {
    pixelDensity(3);
    canvas = createCanvas(2732 / 2, 2048 / 2);
    var divcanvas = document.getElementById("divcanvas");
    divcanvas.width = (2732 / 2) + 4;
    divcanvas.height = (2048 / 2) + 4;
    canvas.parent(divcanvas);
    scenes = [];
    shots = [];

    scenes[0] = null;
    scenes[1] = new Scene1("Open de deuren", 1, 700, "frameCount >= 1 && frameCount <= 700");
    scenes[2] = new Scene2("", 700, 1400, "frameCount >= 700 && frameCount <= 1400");
    scenes[3] = new Scene3("Mier op Roos", 1, 3000, "frameCount >= 1 && frameCount <= 3000");

}

function draw() {

    scenes[3].show();
    //scenes[1].show();
    // scenes[2].show();



}

function showSnapShot(i, title, img) {

    var snapshots = document.getElementById("snapshots");
    var div = document.createElement("div");
    div.className = "w3-center float";
    var lbltitle = document.createElement("label");
    var br = document.createElement("br");
    lbltitle.innerHTML = i + ". " + title;
    snapshots.appendChild(div);
    if (i == 0) {
        var comment = document.getElementById("comment")
        comment.innerHTML = "Er valt nog veel meer te ontdekken ...";
    }
    shots[i] = document.createElement("img");
    shots[i].width = width;
    shots[i].height = height;
    shots[i].className = "thumbnail";
    div.appendChild(shots[i]);
    div.appendChild(br);
    div.appendChild(lbltitle);

    shots[i].src = snap;

}