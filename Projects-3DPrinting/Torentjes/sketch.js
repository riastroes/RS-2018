/* Ria Stroes */
/* @updated: maart 2018  */


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

    maxlayers = 1;
    layer = 0;
    startlayerheight = 0;
    maxskirt = 3;
    print3D = new Print3D("Torentjes", "Anet", "PLA", "normal", maxlayers, startlayerheight, maxskirt);
    print3D.start();
    

    issaved = false;
}

function mousePressed() {
    if (!issaved) {
        if(print3D.checkPrint(printpath, 0, 0, width, height)){
            print3D.save();
            issaved = true;
        }
        
    }
}

function draw() {
    if (layer < maxlayers) {
        print = new Print(createVector(550,550));  //begin in het centrum
        print.create(layer);
        printpath = print.getPrint();
        print3D.addToLayer(layer, printpath);
        print3D.print(layer);
    }
    if (layer == maxlayers) {
        
        print3D.stop();
        noLoop();
    }
    layer++;
}