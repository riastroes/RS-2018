/* Ria Stroes */
/* @updated: november 2017  */
/* Tracing a line
 */


var grid;
var margew, margeh;

var print3D;
var layer;
var maxlayers;
var show;
var printpath;
var offset;

var issaved;
var model;


var name;
var pos;
var path;
var next;
var acolor;
var ablack;
var ared;
var amax, n, k;


var current;
var rest;
var dx;
var dy;
var count;


function preload() {
    model = loadImage("images/lines01.jpg");

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    model.resize(1000, 1000);
    offset = createVector(50, 50);

    stroke(0);
    //rect(offset.x - 1, offset.y - 1, 1000 + 2, 1000 + 2);
    image(model, offset.x, offset.y);
    model.loadPixels();
    //kleur van de achtergrond
    acolor = new Rgb(model.pixels[0], model.pixels[1], model.pixels[2]);
    ablack = new Rgb(0, 0, 0);
    ared = new Rgb(255, 0, 0);
    windowscale = 1;
    printpath = [];
    path = [];
    next = 0;
        

    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.2; // 1
    print3D = new Print3D("Zen", "Anet", "PLAFLEX", "normal", maxlayers, startlayerheight);
    
    pos = findStart();
    
    dx = [0,1,1,1,0,-1,-1,-1];
    dy = [-1,-1,0,1,1,1,0,-1];
    count = 0;
     
    var found = false;
    var i = (pos.y * 1000 * 4) + (pos.x * 4);
    var c = new Rgb(model.pixels[i], model.pixels[i + 1], model.pixels[i + 2]);
    var colormarge = 10;
    if (compareRGBColors(c, ared)) {
        found = true;
    }
    var lastpos;
    current  =0;
    next = 0;
    path[next] = [];
    rest = [];
    printpath = findPath2(pos, 6000);
    
   
    model.updatePixels();
    image(model, offset.x, offset.y);
    checkRest();

    // amax = [];
    // getMaxPath();
    // n = 0;
    // k = 0;
    // console.log("path "+ path.length);
    // console.log("amax "+ amax.length);



    print3D.start();

    issaved = false;




}

function mousePressed() {
    if (!issaved) {
        print3D.save();
        issaved = true;
    }
}

function draw() {

    if( frameCount < printpath.length){
        stroke(255,0,0);

        ellipse(printpath[frameCount].x + offset.x,printpath[frameCount].y + offset.y,2,2);
    }

     else {
        if (layer < maxlayers) {
            //console.log(printpath.length);

            //printpath = print3D.optimizePath(path, 2);
            //console.log(printpath.length);
            print3D.addToLayer(layer, printpath, offset, true);
            print3D.print(layer);

        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
        }
        layer++;
    }




}
function findPath2(p, maxdepth) {
    var i = (p.y * 1000 * 4) + (p.x * 4);
    model.pixels[i] = 255;
    model.pixels[i + 1] = 0;
    model.pixels[i + 2] = 0;
    model.pixels[i + 3] = 255;
    var apath = [];

    append(apath, p);
    for (let b = 0; b < 8; b++) {
        var np = p.copy().add(dx[b], dy[b]);
        var npi = (np.y * 1000 * 4) + (np.x * 4);
        if (maxdepth > 0 && model.pixels[npi] < 50 &&  model.pixels[npi+1] < 50 && model.pixels[npi+2] < 50) {
            var subpath = findPath2 (np, maxdepth - 1);
            //if (subpath.length > 5)
                apath = apath.concat(subpath);
        }
    }
    return apath;
}

function findPath(apath, p) {
    if(apath.length < 20000){
        //kijk naar de buren
        append( apath, p);
        var buren = getBuren(p);
        for(var b = 0; b < buren.length; b++){
            if(b > 0){
                append(rest, buren[b]);
            }
            
        }
        if(buren.length >= 1){
            var i = (buren[0].y * 1000 * 4) + (buren[0].x * 4);
            model.pixels[i] = 255;
            model.pixels[i + 1] = 0;
            model.pixels[i + 2] = 0;
            model.pixels[i + 3] = 255;
        
            
            apath = findPath(apath, buren[0]);
        }
        
       
        
    }

    return apath;
}

function checkRest(){
    for(var r = 0; r < rest.length; r++){
        var last = printpath[printpath.length-1].copy();
        if(dist(rest[r].x, rest[r].y, last.x, last.y) <5){
            buren = getBuren(rest[r]);
            for(var b = 0; b < buren.length; b++){
                console.log(r + " gevonden " + buren.length + " :" +  buren[b]);
                var newpath = [];
                newpath = findPath(newpath, buren[b]);
                if(newpath.length> 1){
                    console.log("lang path gevonden: " + newpath.length);
                    showPath(newpath, color(0, newpath.length, 0));
                    printpath = printpath.concat(newpath);
                }

            }
        }

    }
}

function getBuren(pos) {
    buren = [];
    goedeburen = [];
    buren[7] = pos.copy().add(1, 0);
    buren[6] = pos.copy().add(1, -1);
    buren[5] = pos.copy().add(0, -1);
    buren[4] = pos.copy().add(-1, -1);
    buren[3] = pos.copy().add(-1, 0);
    buren[2] = pos.copy().add(-1, 1);
    buren[1] = pos.copy().add(0, 1);
    buren[0] = pos.copy().add(1, 1);

    let i = 0;
    for (let b = 0; b < buren.length; b++) {
        if (checkColor(buren[b])) {
            goedeburen[i] = buren[b].copy();
            i++;
        }
    }
    buren = [];
    return goedeburen;
}

function findStart() {

    var colormarge = 50;

    var found = false;
    var pos = createVector(0, 0);

    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        pos.x = floor((i / 4) % 1000);
        pos.y = floor((i / 4) / 1000);
        if (checkColor(pos)) {

            found = true;


            model.pixels[i] = 255;
            model.pixels[i + 1] = 0;
            model.pixels[i + 2] = 0;
            model.pixels[i + 3] = 255;
            break;

        }
    }

    return pos;
}

function getMaxPath() {
    var foundmax = 0;
    var max = 0;

    var m = 0;


    for (var i = 0; i < path.length; i++) {
        if (max <= path[i].length) {
            max = path[i].length;
            foundmax = i;
            amax[m] = max;
            m++;
        }
    }

}

function showPath(path, acolor) {

    for (var i = 0; i < path.length; i++) {
        stroke(acolor);
        ellipse(path[i].x + offset.x, path[i].y + offset.y, 2, 2);
    }

}

function showDifferencePaths(m, acolor) {

    for (var i = 0; i < path[m].length; i++) {
        stroke(acolor);
        ellipse(path[m][i].x + offset.x, path[m][i].y + offset.y, 5, 5);
    }

}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function checkColor(pos) {
    let found = false;
    let i = (pos.y * 1000 * 4) + (pos.x * 4);
    let c = new Rgb(model.pixels[i], model.pixels[i + 1], model.pixels[i + 2]);
    
    if (compareRGBColors(c, ablack, 50)) {
        found = true;
    }

    return found;
}
function compareRGBColors(acolor, bcolor, colormarge) {
    let ok = false;
    if ( abs(acolor.r - bcolor.r) < 50 && abs(acolor.g - bcolor.g) < 50 && abs(acolor.b - bcolor.b) < 50){
        ok = true;
    }
    return ok;
}
function compareColors(acolor, bcolor, colormarge) {
    let ok = false;
    if (abs(red(acolor) - red(bcolor) < colormarge) &&
        abs(green(acolor) - green(bcolor) < colormarge) &&
        abs(blue(acolor) - blue(bcolor) < colormarge)) {
        ok = true;
    }
    return ok;
}

function inPos(next) {
    var found = false;
    for (var i = 0; i < pos.length; i++) {
        if (pos[i].x == next.x && pos[i].y == next.y) {
            found = true;
            break;
        }
    }
    return found;
}