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
    maxlayers = 1;
    var startlayerheight = 0.2; // 1
    print3D = new Print3D("Spanten-", "Anet", "PLA", "normal", maxlayers, startlayerheight);
    printpath = [];
    offset = createVector(50,50);


    
    




}


function draw() {

    
        if (layer == 0){
            createSpant(createVector(550,550),500,0, PI);

        }
        else if( layer == maxlayers) {
            print3D.start();
           // printpath = print3D.optimizePath(printpath, 5);

            if (layer % 2 == 0) {
                print3D.addToLayer(layer-1, printpath, offset, true);
                
            } else {
                print3D.addToLayer(layer-1, reversePath(printpath), offset, true);
                
            }
           // background(255);
            print3D.print(layer-1);
            //last
            fill(255,0,0);
            ellipse(printpath[printpath.length - 1].x + offset.x, printpath[printpath.length - 1].y + offset.y, 10,10);

        }
        else if (layer + 1 == maxlayers) {
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
function createSpant(center, size, startangle, endangle){
    let x,y;
    for(var angle = startangle; angle <= endangle; angle+=(PI / 30)){
        x = center.x + (size * cos(angle));
        y = center.y + (size * sin(angle));
        append(printpath, createVector(x, y));
    }

}







