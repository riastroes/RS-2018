/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var acolor, bcolor;
var colorstrip;
var colShapes;

var space

var tree;
var clicked;


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);

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

    canvas.mouseClicked(listenToMouse);
    issaved = false;
}

function listenToMouse() {
    if (!issaved) {

        issaved = true;
    }

    if (colorstrip.isClicked(mouseX, mouseY, true)) {
        colorstrip.isclicked = false;
    } else {
        var i = colShapes.length;
        var anglelist = [];
        for (var a = 0; a < 3; a++) {
            append(anglelist, (TWO_PI / 3) * a);
        }
        colShapes[i] = new Shape();
        colShapes[i].style(color(0), colorstrip.color, 1);
        colShapes[i].createOnCircle(30, anglelist);
        colShapes[i].moveTo(createVector(mouseX, mouseY));


    }
    return false;
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
            //colShapes[i].move(1);
            space.draw(colShapes[i]);
        }
    }


}