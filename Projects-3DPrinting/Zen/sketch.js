/* Ria Stroes */
/* @updated: november 2017  */
/* Tracing a line
*/


var grid;
var palette;
var colors;
var margew, margeh;

var print3D;
var layer;
var maxlayers;
var show;

var issaved;
var model;
var offset;

var name;
var pos;
var path;
var next;
var acolor;
var red;



function preload() {
    model = loadImage("images/line04.jpg");
}

function setup() {

    var canvas = createCanvas(1100, 1100);
    model.resize(1000, 1000);
    offset = createVector(50, 50);

    stroke(0);
    //rect(offset.x - 1, offset.y - 1, 1000 + 2, 1000 + 2);
    image(model, offset.x, offset.y);
    model.loadPixels();
    acolor = color(model.pixels[0], model.pixels[1], model.pixels[2], model.pixels[3]);

    windowscale = 1;
    palette = new Color();
    colors = palette.create(10);
    red = colors[0];


    layer = 0;
    maxlayers = 1;
    var startlayerheight = 0.5; // 1
    var maxskirt = 2; //0 whithout skirt
    //startlayerheight = 2;  // JellyBox
    //print3D = new Print3D("JellyBox", "MAXXFLEX", "normal", maxlayers, startlayerheight, maxskirt);
    print3D = new Print3D("Zen", "Annet", "PLA", "fine", maxlayers, startlayerheight);


    maxw = 120; //200
    maxh = 120; //35
    margew = 30;
    margeh = 150;
    
    
    pos = findStart();
    next = 0;
    path = [];
    path[next] = [];
    
    findPath(next, pos);
    model.updatePixels();
    image(model, offset.x, offset.y);
    var m = showMaxPath();
    
    // showDifferencePath(m, colors[2]);
    // showDifferencePath(m, colors[3]);
    // showDifferencePath(m, colors[4]);
    // showDifferencePath(m, colors[5]);
    // showDifferencePath(m, colors[6]);
    // showDifferencePath(m, colors[7]);
    // showDifferencePath(m, colors[8]);
    
    

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

    if (layer < maxlayers) {

        

        name = "Zen";
        //print3D.print(layer);

    }
    if (layer + 1 == maxlayers) {
        print3D.stop();
        noLoop();
    }
    layer++;

}

function findPath(current, p){
   
    append(path[current], p);
    //kijk naar de buren
    var buren = getBuren(p);
   
    for(var b = 0; b < buren.length; b++){
        next++;
        path[next] = [];
        path[next] = path[next].concat(path[current]);
        if(next < 6000){
            //console.log(next);
            var i = (buren[b].y * 1000 * 4) + (buren[b].x * 4);
            model.pixels[i] = 255;
            model.pixels[i+1] = 0;
            model.pixels[i+2] = 0;
            //model.pixels[i+3] = 255;
        
            findPath(next, buren[b]);
        }
        
    }
    
    
}
function getBuren(pos){
    var buren = [];
    var goedeburen = [];
    buren[0] = pos.copy().add(1,0);
    buren[1] = pos.copy().add(1,-1);
    buren[2] = pos.copy().add(0,-1);
    buren[3] = pos.copy().add(-1,-1);
    buren[4] = pos.copy().add(-1,0);
    buren[5] = pos.copy().add(-1,1);
    buren[6] = pos.copy().add(0,1);
    buren[7] = pos.copy().add(1,1);

    var i = 0;
    for(var b = 0; b < buren.length; b++){
        if(checkColor(buren[b], colors[b])){
            goedeburen[i]= buren[b].copy();
            i++;
        }
    }

    return goedeburen;
}
function findStart() {
    
    var colormarge = 50;
    
    var found = false;
    var pos = createVector(0, 0);
   
    //first black pixel
    for (var i = 0; i < model.pixels.length; i += 4) {
        var c = color(model.pixels[i], model.pixels[i+1],model.pixels[i+2],model.pixels[i+3]);
        if (palette.compare(c, color(0), 10) ) {

            found = true;
            pos.x = floor((i / 4) % 1000);
            pos.y = floor((i / 4) / 1000);

            model.pixels[i] = 255;
            model.pixels[i+1] =255;
            model.pixels[i+2] =255;
            model.pixels[i+3] = 255;
            break;

        }
    }
         
    return pos;
}
function showMaxPath(){
    var foundmax = 0;
    var max = 0;
    for(var i = 0; i < path.length; i++){
        if(max < path[i].length){
            max = path[i].length;
            foundmax = i;
        }
    }

    console.log("langste pad: " + foundmax);
    console.log(path[foundmax])
    for(var i = 0; i < path[foundmax].length; i++){
        stroke(0);
        ellipse( path[foundmax][i].x, path[foundmax][i].y, 10,10);
    }
    return foundmax;
}

function showDifferencePath(m, acolor){
    var diffpath= [];
   
    for(i = 0; i < path.length; i++){
        diffpath[i] = [];
        for(var j = 0; j < path[i].length; j++){
            if(!contains(path[m],path[i][j])){
                append(diffpath[i], path[i][j]);
            }
        }
    }

    var max = 0;
    var maxd = 0;
    for(var d =0; d < diffpath.length; d++){
        if(diffpath[d].length > max){
            max = diffpath[d].length;
            maxd = d;
        }
    }
    console.log("langste diffpad: " + maxd);
    console.log(diffpath[maxd])
    for(var i = 0; i < diffpath[maxd].length; i++){
        stroke(acolor);
        ellipse( diffpath[maxd][i].x, diffpath[maxd][i].y, 10,10);
    }
    path[m] = path[m].concat(diffpath[maxd]);
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function checkColor(next, tracecolor){
    var found = false;
    var i = (next.y * 1000 * 4) + (next.x * 4);
    var c = color(model.pixels[i], model.pixels[i+1],model.pixels[i+2],model.pixels[i+3]);
    var colormarge = 10;
    try{

    if (palette.compare(c, acolor, colormarge) ){
        //background
    }
    else if(palette.compare(c, red, colormarge)){
        // tracecolor
    }
    else{
        found = true
       // console.log(next.x + ", " + next.y);
       // stroke(0);
       // ellipse(next.x + offset.x, next.y + offset.y, 10, 10);
    }
}
catch(exeption){
    console.log("FOUT:" + i);
}
    return found;
}
function inPos(next){
    var found = false;
    for(var i =0; i < pos.length; i++){
        if(pos[i].x == next.x && pos[i].y == next.y){
            found = true;
            break;
        }
    }
    return found;
}





