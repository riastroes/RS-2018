/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var colors;
var colorstrip;

var offset;

var space

var tree;
var clicked;


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(10, "random_kleuren");
    colorstrip.setTransparency(0.5);
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


    dx = [0, 1, 1, 1, 0, -1, -1, -1];
    dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    issaved = false;
}


function draw() {
    background(255);
    colorstrip.show();
    if (frameCount == 1) {
        //plaats in elke cel een random kleur
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                var cell = space.get(x, y);
                cell.obj = new Spot(cell.center, colors[floor(random(10))], 10);
                cell.draw();
            }
        }

    } else {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                var cell = space.get(x, y);
                if (cell.inCell(mouseX, mouseY)) {
                    cell.obj.size++;

                }
                cell.draw();
            }
        }
    }
}