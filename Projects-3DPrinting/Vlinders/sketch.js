/* Ria Stroes */
/* @updated: januari 2018  */


var print3D;
var maxlayers;
var layer;
var startlayerheight;
var maxskirt;
var printpath;
var issaved;

var print;

function setup() {

    var canvas = createCanvas(1100, 1100);

    maxlayers = 2;
    layer = 0;
    startlayerheight = 0;
    maxskirt = 3;
    print3D = new Print3D("Vlinders", "Anet", "PLAFLEX", "fine", maxlayers, startlayerheight, maxskirt);
    print3D.start();

    issaved = false;
}

function mousePressed() {
    if (!issaved) {
        if (print3D.checkPrint(printpath, 0, 0, width, height)) {
            print3D.save();
            issaved = true;
        }

    }
}

function draw() {
    if (layer < maxlayers) {
        print = new Print(); //begin in het centrum
        print.create(layer, createVector(400, 200));

        printpath = print.getPrint();
        if (layer == maxlayers - 1) {
            printpath = printpath.concat(createVector(350, 75));
        }
        print3D.addToLayer(layer, printpath);

        print3D.print(layer);
    }
    if (layer == maxlayers) {

        print3D.stop();
        noLoop();
    }
    layer++;
}