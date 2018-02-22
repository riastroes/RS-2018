/* Ria Stroes */
/* @updated: november 2017  */
/*
 */


var grid;
var margew, margeh;

var print3D;
var layer;
var maxlayers;
var show;
var printpath;
var offset;

var iscreated;
var issaved;
var isready;
var model;


var name;
var pos;
var path;
var next;

var zeester;


function setup() {

    var canvas = createCanvas(1000, 1000);
    isready = false;

    windowscale = 1;
    printpath = [];
    path = [];


    layer = 0;
    maxlayers = 1;
    var startlayerheight = 5; // 1 CM
    print3D = new Print3D("Zeester", "Anet", "TRANS", "normal", maxlayers, startlayerheight);
    
   
    frameRate(1);
    isready = false;
    issaved = false;

}


function draw() {

    if (!iscreated) {
        background(255);
        push();
        scale(0.7);
        
        for (var i = 0; i < 5; i++) {

            zeester = new Zeester();
            zeester.print2(i);
           
            
            printpath = printpath.concat(zeester.path);
           
        }
        pop();
        iscreated = true;
    } else {
        if (layer < maxlayers) {

            print3D.start();
            print3D.addPointToLayer(layer, createVector(150, 30), true);
            print3D.addPointToLayer(layer, createVector(750, 50), true);
            print3D.addPointToLayer(layer, createVector(550, 50), true);
            print3D.addToLayer(layer, printpath);

            //print3D.addPointToLayer(layer, createVector(990, 990), true);
            print3D.print(layer);
            isready = true;

        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
            isready = true;
        }
        layer++;
    }





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

function findPath(p, maxdepth) {
    var i = (p.y * 1000 * 4) + (p.x * 4);
    model.pixels[i] = 255;
    model.pixels[i + 1] = 0;
    model.pixels[i + 2] = 0;
    model.pixels[i + 3] = 255;
    var apath = [];

    append(apath, p);
    var subpath = [];
    var longest = 0;
    for (let b = 0; b < 8; b++) {
        var np = p.copy().add(dx[b], dy[b]);
        var npi = (np.y * 1000 * 4) + (np.x * 4);
        if (maxdepth > 0 && model.pixels[npi] < 50 && model.pixels[npi + 1] < 50 && model.pixels[npi + 2] < 50) {
            subpath[b] = findPath(np, maxdepth - 1);

        }

    }

    var longest = 0;
    var i;
    for (let b = 0; b < 8; b++) {

        if (subpath[b] && subpath[b].length > longest) {
            longest = subpath[b].length;
            i = b;
        }
    }
    if (longest > 0) {
        apath = apath.concat(subpath[i]);
        last = apath[apath.length - 1];
    }

    return apath;
}


function findStart(start) {


    var found = false;
    var pos = createVector(0, 0);
    var maxdis = 20;
    var min = 0;

    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        pos.x = floor((i / 4) % 1000);
        pos.y = floor((i / 4) / 1000);
        if (checkColor(pos)) {
            if (dist(start.x, start.y, pos.x, pos.y) < maxdis) {
                maxdis = dist(start.x, start.y, pos.x, pos.y);
                min = i;
                found = true;
            }
        }
    }
    if (found) {
        model.pixels[min] = 255;
        model.pixels[min + 1] = 0;
        model.pixels[min + 2] = 0;
        model.pixels[min + 3] = 255;
        pos.x = floor((min / 4) % 1000);
        pos.y = floor((min / 4) / 1000);

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

function drawPath(path) {
    let i;
    let n;
    for (n = 0; n < path.length; n++) {
        i = (path[n].y * 1000 * 4) + (path[n].x * 4);

        model.pixels[i] = 255;
        model.pixels[i + 1] = 0;
        model.pixels[i + 2] = 255;
    }

}

function showPath(path, acolor) {
    let i;
    for (i = 0; i < path.length; i++) {
        stroke(acolor);
        ellipse(path[i].x + offset.x, path[i].y + offset.y, 2, 2);
    }
    ellipse(path[i - 1].x + offset.x, path[i - 1].y + offset.y, 6, 6);

}

function showPoint(vector, acolor) {
    stroke(acolor);
    fill(acolor);
    ellipse(vector.x + offset.x, vector.y + offset.y, 6, 6);

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
    if (abs(acolor.r - bcolor.r) < 50 && abs(acolor.g - bcolor.g) < 50 && abs(acolor.b - bcolor.b) < 50) {
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