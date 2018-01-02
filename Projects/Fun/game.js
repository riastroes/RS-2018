/* Ria Stroes */
/* @updated: september 2017  */



var issaved;
var acolor, bcolor;
var colorstrip;
var colShapes;

var space

var tree;

var print3D;
var maxlayers;
var layer;
var startlayerheight;
var maxskirt;

function setup() {

    var canvas = createCanvas(windowWidth, windowHeight);

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.setTransparency(0.2);

    colorstrip.create(5, "rode_kleuren");
    colorstrip.create(5, "gele_kleuren");
    colorstrip.create(5, "groene_kleuren");
    colorstrip.create(5, "blauwe_kleuren");
    colorstrip.create(5, "paarse_kleuren");
    colorstrip.show();
    colShapes = [];

    tree = new Tree();
    for (var i = 0; i < 10; i++) {
        var x = floor(random(0, 10));
        tree.add(x);
    }
    tree.visit();

    space = new Space(width, height - 50, 5, 5);
    space.position(createVector(0, 50));
    space.scaleCells(0.9, 0.9);


    maxlayers = 1;
    layer = 0;
    startlayerheight = 0;
    maxskirt = 3
    print3D = new Print3D("Ultimaker2+", "PLA", "fine", maxlayers, startlayerheight, maxskirt);


    issaved = false;
}

function mousePressed() {
    if (!issaved) {

        issaved = true;
    }

    if (colorstrip.isClicked(true)) {

    } else {
        var i = colShapes.length;

        colShapes[i] = new Shape(createVector(0, 0), colorstrip.color);
        colShapes[i].createOnCircle(3);


    }
}

function draw() {
    if (frameCount % 50 == 0) {
        for (var i = 0; i < colShapes.length; i++) {
            colShapes[i].changeDirection();
            colShapes[i].change(8);
        }
    }
    if (frameCount % 1 == 0) {
        colorstrip.clearBackground(true);
        for (var i = 0; i < colShapes.length; i++) {
            colShapes[i].move(1);
            space.draw(colShapes[i]);
        }
    }


}