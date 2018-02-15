/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var colors;
var colorstrip;

var offset;
var x,y;
var space

var tree;
var clicked;


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(10, "rode_kleuren");
    colorstrip.setTransparency(1);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);

    // tree = new Tree();
    // for (var i = 0; i < 10; i++) {
    //     var x = floor(random(0, 10));
    //     tree.add(x);
    // }
    // tree.visit();

    space = new Space(width - 100, height - 100, 10, 10);
    space.position(offset);
    //space.scaleCells(0.9, 0.9);

    x = 250;
    y = 850;
    dx = [0, 1, 1, 1, 0, -1, -1, -1];
    dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    noFill();
    noFill();
    strokeWeight(5);
    stroke(colorstrip.randomColor(true))
    background(255);
    issaved = false;
}


function draw() {
    background(255,1);
      
        var t = map(mouseX, 0, width, -5, 5);
        curveTightness(t);
        beginShape();
        curveVertex(x,y);
        curveVertex(550, 300);
        curveVertex(850, 450);
        curveVertex(650, 650);
        curveVertex(550, 300);
        curveVertex(x,y);
        endShape();
    colorstrip.show();
    x += dx[floor(random(dx.length))]*10;
    y += dy[floor(random(dy.length))]*10;

    ellipse( 550, 300,10,10);
    ellipse( 850, 450,10,10);
    ellipse( 650, 650,10,10);
    ellipse( 550, 300,10,10);
}