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
var start;

var issaved;
var isready;
var model1, model2;


var name;
var pos;
var path;
var next;
var acolor;
var ablack;
var ared;
var amax, n, k;


var dx;
var dy;

var tcount;
var oldlen, len;


function preload() {
    model1 = loadImage("images/kronkel3.png");
    model2 = loadImage("images/kronkel4.png");

}

function setup() {

    var canvas = createCanvas(1100, 1100);
    isready = false;
    model1.resize(1000, 1000);
    model2.resize(1000, 1000);
    offset = createVector(50, 50);

    stroke(0);

    image(model1, offset.x, offset.y);
    image(model2, offset.x, offset.y);
    model1.loadPixels();
    model2.loadPixels();

    //kleur van de achtergrond
    acolor = new Rgb(255,255,255);
    ablack = new Rgb(0, 0, 0);
    ared = new Rgb(255, 0, 0);
    windowscale = 1;
    printpath = [];
    path = [];


    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    print3D = new Print3D("Zen01-", "Anet", "PLAFLEX", "normal", maxlayers, startlayerheight);


    dx = [0, 1, 1, 1, 0, -1, -1, -1];
    dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    oldlen = 0;
    len = 11;
   
   
    issaved = false;
    tcount = 0;



}


function draw() {

    if (layer== 0 &&(len - oldlen > 10) && frameCount < 40) {
        
        zoekLangstePad(model1, start);
        start = printpath[printpath.length - 1].copy();
        oldlen = len;
        len = printpath.length;
        drawPath(model1, printpath);
        console.log(len);
        model1.updatePixels();
        image(model1, offset.x, offset.y);
        showPoint(last, color(255, 0, 0));
        
        start = printpath[printpath.length - 1].copy();

    }
    else if(frameCount == 40 || (len - oldlen <= 10)){
        //reset
        len = 11;
        oldlen = 0;
       
      } 
    else if( (len - oldlen > 10) &&  frameCount < 80){
        //other model
        start = printpath[printpath.length - 1].copy();
        zoekLangstePad(model2, start);
        start = printpath[printpath.length - 1].copy();
        oldlen = len;
        len = printpath.length;
        drawPath(model2, printpath);
        console.log(len);
        model2.updatePixels();
        image(model2, offset.x, offset.y);
        showPoint(last, color(255, 0, 0));
    } 
    else {
        if (layer < maxlayers) {
            print3D.start();
            printpath = print3D.optimizePath(printpath, 5);

            if (layer % 2 == 0) {
                print3D.addToLayer(layer, printpath, offset, true);
            } else {
                print3D.addToLayer(layer, reversePath(printpath), offset, true);
            }
            background(255);
            print3D.print(layer);
            

        }
        if (layer + 1 == maxlayers) {
            print3D.stop();
            noLoop();
            isready = true;
        }
        layer++;
    }





}

function zoekLangstePad(model, start) {

    reloadModel(model);

    //begin met een nieuwe start positie
    if (printpath.length == 0) {
        start = createVector(50, 50);
    } else {
        start = printpath[printpath.length - 1].copy();
    }
    ellipse(start.x, start.y, 20,20);
    last = findStart(model, start);

    if (last.x != 999 && last.y != 999) {

        var loop = 0;
        while (loop < 10 && last.x < 999 && last.y < 999) {
            path = [];
            path = findPath(model, last, 5000);
            if (path.length <= 1) {
                loop++;
                last = findStart(model, last);
                if (last.x == 999 && last.y == 999) {
                    loop = 100;
                    path = [];
                }
            } else {
                printpath = printpath.concat(path);
            }
        }
    }

}

function reloadModel(model) {
    model.loadPixels();
    for (var i = 0; i < model.pixels.length; i += 4) {
        //rood wordt weer zwart
        if (model.pixels[i] == 255 && model.pixels[i + 1] == 0 && model.pixels[i + 2] == 0) {
            model.pixels[i] = 0;
        }
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

function findPath(model, p, maxdepth) {
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
            subpath[b] = findPath(model, np, maxdepth - 1);

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


function findStart(model, start) {


    var found = false;
    var pos = createVector(0, 0);
    var maxdis = 20;
    var min = 0;

    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        pos.x = floor((i / 4) % 1000);
        pos.y = floor((i / 4) / 1000);
        if (checkColor(model, pos)) {
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

function drawPath(model, path) {
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

function checkColor(model, pos) {
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