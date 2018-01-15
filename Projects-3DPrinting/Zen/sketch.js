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





function preload() {
    model = loadImage("images/Image.png");

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
    acolor = color(model.pixels[0], model.pixels[1], model.pixels[2], model.pixels[3]);
    ablack = color(0, 0, 0, 255);
    ared = color(255, 0, 0, 255);
    windowscale = 1;



    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    print3D = new Print3D("Zen", "Anet", "PLA", "fine", maxlayers, startlayerheight);
    printpath = [];
    pos = findStart();
    next = 0;
    path = [];
    path[next] = [];
    var found = false;
    var i = (pos.y * 1000 * 4) + (pos.x * 4);
    var c = color(model.pixels[i], model.pixels[i + 1], model.pixels[i + 2], model.pixels[i + 3]);
    var colormarge = 10;
    if (red(c) == red(ared) && green(c) == green(ared) && blue(c) == blue(ared)) {
        found = true;

    }

    findPath(next, pos);
    model.updatePixels();
    image(model, offset.x, offset.y);
    amax = [];
    getMaxPath();
    n = 0;
    k = 0;
    console.log(amax.length);



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

    if (n < path.length) {
        if (path[n].length > 0) {
            //showPath(n, color(0, 0, 0));
            console.log(k + "," + n + "," + path[n].length);
            path[n][0].z = -1;
            printpath = printpath.concat(path[n]);
            n += 1;
            k += 1;

        } else if (path[n] == undefined) {
            n += 1;
        } else if (path[n].length == 0) {
            n += 1;
        }
    } else {
        if (layer < maxlayers) {
            console.log(printpath.length);

            printpath = print3D.optimizePath(printpath, 3);
            console.log(printpath.length);
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

function findPath(current, p) {

    append(path[current], p);
    //kijk naar de buren
    var buren = getBuren(p);

    for (var b = 0; b < buren.length; b++) {
        if (b > 0) {
            next++;
            path[next] = [];


        }
        var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
        model.pixels[i] = 255;
        model.pixels[i + 1] = 0;
        model.pixels[i + 2] = 0;
        model.pixels[i + 3] = 255;
        var newpath = [];

        newpath = findPath(next, buren[b]);
        if (newpath.length < 10) {
            newpath = [];
            path[next] = [];
        }



    }
    return path[current];
}



function getBuren(pos) {
    var buren = [];
    var goedeburen = [];
    buren[7] = pos.copy().add(1, 0);
    buren[6] = pos.copy().add(1, -1);
    buren[5] = pos.copy().add(0, -1);
    buren[4] = pos.copy().add(-1, -1);
    buren[3] = pos.copy().add(-1, 0);
    buren[2] = pos.copy().add(-1, 1);
    buren[1] = pos.copy().add(0, 1);
    buren[0] = pos.copy().add(1, 1);

    var i = 0;
    for (var b = 0; b < buren.length; b++) {
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

function showPath(m, acolor) {

    for (var i = 0; i < path[m].length; i++) {
        stroke(acolor);
        ellipse(path[m][i].x + offset.x, path[m][i].y + offset.y, 10, 10);
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
    var found = false;
    var i = (pos.y * 1000 * 4) + (pos.x * 4);

    var c = color(model.pixels[i], model.pixels[i + 1], model.pixels[i + 2], model.pixels[i + 3]);
    var colormarge = 50;
    if (compareColors(c, ablack, colormarge)) {
        found = true;
    }

    return found;
}

function compareColors(acolor, bcolor, colormarge) {
    var ok = false
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