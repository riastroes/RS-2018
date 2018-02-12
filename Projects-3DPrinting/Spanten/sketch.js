/* Ria Stroes */
/* @updated: november 2017  */
/* Spanten
 */




var print3D;
var layer;
var maxlayers;
var show;
var printpath;
var offset;
var center;

var issaved;
var isready;

function setup() {

    var canvas = createCanvas(1100, 1100);
    isready = false;


    layer = 0;
    maxlayers = 5;
    var startlayerheight = 0.2; // 1
    print3D = new Print3D("Spanten" + maxlayers + "-", "Anet", "PLA", "normal", maxlayers, startlayerheight);
    printpath = [];
    offset = createVector(50, 50);
    
    print3D.start();



}


function draw() {


    if (layer < maxlayers) {
        printpath =[];
        // for (var i = 0; i < 5; i += 1) {
        //     if (i % 2 == 0) {
        //         createSpant(createVector(500, 550), 450 + (i * 3), 0, PI);
        //     } else {
        //         createSpant(createVector(500, 550), 450 + (i * 3), PI, 0);
        //     }

        // }
        // append(printpath, createVector(25, 400));
        // for (var i = 1; i < 8; i += 1) {
        //     if (i % 2 == 0) {
        //         createSpant(createVector(500, 400), 450 - (i * 3), 0, PI);
        //     } else {
        //         createSpant(createVector(500, 400), 450 - (i * 3), PI, 0);
        //     }

        // }
       // append(printpath, createVector(1025, 250));
        for (var i = 0; i < 10; i += 1) {
            if (i % 2 == 0) {
                createSpant(createVector(500, 250), 450 - (i * 3), 0, PI);
            } else {
                createSpant(createVector(500, 250), 450 - (i * 3), PI, 0);
            }

        }
        // append(printpath, createVector(1025, 50));
        // for (var i = 0; i < 10; i += 1) {
        //     if (i % 2 == 0) {
        //         createSpant(createVector(500, 50), 400 + (i * 3), 0, PI);
        //     } else {
        //         createSpant(createVector(500, 50), 400 + (i * 3), PI, 0);
        //     }

        // }
        // append(printpath, createVector(1025, 50));
        print3D.addToLayer(layer, printpath, offset, true);

        
    } else if (layer == maxlayers) {
        isready = true;
        for(var i = 0; i < maxlayers; i++){
            print3D.print(i);
        }

        
        fill(255, 0, 0);
        ellipse(printpath[printpath.length - 1].x + offset.x, printpath[printpath.length - 1].y + offset.y, 10, 10);

    } else if (layer + 1 == maxlayers) {
        print3D.stop();
        noLoop();
        isready = true;
    }
    layer++;






}


function mousePressed() {
    if (!issaved && isready) {
        print3D.save();
        issaved = true;
    }
}

function reversePath(path) {
    var reverse = [];
    for (var i = path.length - 1; i >= 0; i--) {
        append(reverse, path[i]);
    }
    return reverse;
}

function createSpant(center, size, startangle, endangle) {
    let x, y;
    let step = (PI / 30);
    if (startangle < endangle) {
        for (var angle = startangle; angle <= endangle; angle += step) {
            x = center.x + (size * cos(angle));
            y = center.y + (size * sin(angle));
            append(printpath, createVector(x, y));
        }
    } else {
        for (var angle = startangle; angle >= endangle; angle -= step) {
            x = center.x + (size * cos(angle));
            y = center.y + (size * sin(angle));
            append(printpath, createVector(x, y));
        }
    }


}