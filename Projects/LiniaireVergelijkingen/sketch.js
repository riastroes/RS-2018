/* Ria Stroes */
/* @updated: september 2017  */
/* THEORIE:

 Liniaire Vergelijkingen
    x = a.y + b
    a is een richtingscoefficient
    b is een constante

 een lijn gaat door 2 punten

 minimum waarde van y binnen het vlak is 0
 maximum waarde van y binnen het vlak is height;

 minimum waarde van x binnen het vlak is 0
 maximum waarde van x binnen het vlak is width;

 wat zijn dan de grenswaarden van a en b?
 */



var canvas;
var issaved;
var colors;
var colorstrip;

var offset;

var space

var tree;
var clicked;
var x1,x2,y1,y2;
var a,b,r;


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);

    
    offset = createVector(100,100);

    // tree = new Tree();
    // for (var i = 0; i < 10; i++) {
    //     var x = floor(random(0, 10));
    //     tree.add(x);
    // }
    // tree.visit();

    space = new Space(width - 200, height - 200, 10, 10);
    space.position(offset);
    var cell = space.get(0,0);
    //space.scaleCells(0.9, 0.9);

    cx1 = -cell.w; cy1= -cell.h;
    cx2 = cell.w;  cy2= -cell.h;
    x1 = -cell.w; y1 = -cell.h;
    x2 = -cell.w; y2 = cell.h;
    a = 0;
    b = 0;
    r = 1;

    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(space.cols * space.rows, "rode_kleuren");
    colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

   
    noFill();
    strokeWeight(1);
    stroke(colorstrip.randomColor(false))
    //background(255);
    //frameRate(1);
    issaved = false;
}


function draw() {
    fill(0,100,100, 0.01);
    noStroke();
    rect(0,0, width, height);
    colorstrip.show();

    for(var x = 0; x< space.cols; x++){
        for(var y = 0; y< space.rows; y++){
            var cell = space.get(x,y);
            
            push();
            
            translate(cell.center.x,cell.center.y );
            scale(.7);
            //rotate(x * PI /space.rows );
            
            if(x2 < -(cell.w) || x2 > (cell.w) || x1 < -(cell.w) || x1 > (cell.w) ) {
               // wisselen van richting
               r = -r;
            }
            b += r*1;
            a += r* 0.01;
            x1 = aline(y1, a, b);
            x2 = aline(y2, a, b);
         
            var t = map((x*y)%100,0,100, -5,5);
            curveTightness(t);
            stroke(colors[x*y]);
            strokeWeight(1);
            noFill();
            curve(cx1,cy1,x1,y1,x2,y2,cx2,cy2);
            curve(cx2,cy2, -x1,y1,-x2,y2,cx1,cy1);
            
            pop();
        }
       
    }
    
    
    //colorstrip.show();
    


}

function aline(y, a, b){
     return a * y + b;
}