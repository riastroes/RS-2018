/* Ria Stroes */
/* @updated: november 2017  */
/* Metro
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

var x;
var y;

var dx;
var dy;


var oldlen, len;
var kronkel;
var k;


function preload() {
    //model = loadImage("images/lines03.jpeg");

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    isready = false;
    space = new Space(1000, 1000, 3, 3);


    offset = createVector(350, 350);
    x = 0;
    y = 0;
    k = 0;
    stroke(0);
    kronkel = []
    kronkel[k] = new Kronkel(createVector(0, 0), 150, 150);

    windowscale = 1;
    printpath = [];
    path = [];


    layer = 0;
    maxlayers = 1;
    var startlayerheight = 2; // 1
    print3D = new Print3D("Metro", "Ultimaker2+", "PLA", "fine", maxlayers, startlayerheight);


    isready = false;
    issaved = false;

}


function draw() {

    if (!iscreated) {
        //iscreated set by mouseclick.
        if (kronkel[k].move(10)) {
            space.grid[x][y].draw(kronkel[k]);
        }

    } else {
        if (layer < maxlayers) {

            print3D.start();
            print3D.addPointToLayer(layer, createVector(150, 30), true);
            print3D.addPointToLayer(layer, createVector(750, 50), true);
            print3D.addPointToLayer(layer, createVector(150, 50), true);
            for (var i = 0; i < kronkel.length; i++) {
                print3D.addToLayer(layer, kronkel[i].path, kronkel[i].offset, true);
                print3D.addToLayer(layer, kronkel[i].toendpath(), kronkel[i].offset, true);
            }
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
    x += 1;
    if (x == space.cols) {
        x = 0;
        y += 1;
    }
    if (x == 0 && y == space.rows) {
        iscreated = true;
    }

    if (!iscreated) {
        printpath = printpath.concat(kronkel[k].path);
        k++;
        kronkel[k] = new Kronkel(createVector(0, 0), 150, 150);



    } else if (!issaved && isready) {
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