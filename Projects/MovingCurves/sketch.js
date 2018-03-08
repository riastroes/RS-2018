/* Ria Stroes */
/* @updated: september 2017  */
/* THEORIE:

een array van punten (from), maakt een curve naar een array van punten (to).
De curves worden beinvloed van buitenaf
 
*/



var canvas;
var issaved;
var colors;
var colorstrip;
var control1, control2;
var a,b,c,d;
var colab, colcd;
var path;
var mover1, mover2;


function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(20, "donkere_kleuren");
    
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();
    
    a = createVector( -100, -100);
    b = createVector( width+100,-100);
    c = createVector( -100, height+100);
    d = createVector( width+100, height+100);

    control1 = createVector(500, 500);
    control2 = createVector(500, 500);

    path = new Path();
    mover1 = new Mover();
    mover2 = new Mover();
   
   
    noFill();
    strokeWeight(1);
   // stroke(colorstrip.randomColor(false))
   
    issaved = false;
}


function draw() {
   noStroke();
   fill(255,0.005);
  rect(0,0, width, height);
   mover1.walk(10);
   mover2.walk(10);
    
   
        control1.x = mover1.x;
        control1.y = mover1.y;
        control2.x = mover2.x;
        control2.y = mover2.y;

        //stroke(0);
        //strokeWeight(3);
        //point(control1.x, control1.y);

        //stroke(0);
        //strokeWeight(3);
        //point(control2.x, control2.y);

    
    //teken line ab
    stroke(0);
    strokeWeight(1);
    curve(control1.x,  control1.y, a.x, a.y, b.x, b.y, control2.x,  control2.y)
    //teken line cd
    stroke(0);
    strokeWeight(1);
    curve(control1.x,  control1.y, c.x, c.y, d.x, d.y, control2.x,  control2.y);
    //teken de lijnen tussen ab en cd;
    colab = path.pointsOnCurve(control1, a,b, control2, 150);
    colcd = path.pointsOnCurve(control1, c,d, control2, 50);
    colac = path.pointsOnCurve(control1, a,c, control2, 100);
    colbd = path.pointsOnCurve(control1, b,d, control2, 10);

    for(var i = 0; i < 100; i++){
        var co = floor(map(colab[i%colab.length].x, -100, width+100, 0,19));
        co = constrain(co, 0,19);
        stroke(colors[co]);
        strokeWeight(1);
        curve(control1.x,  control1.y, colab[i%colab.length].x, colab[i%colab.length].y, colcd[i%colcd.length].x, colcd[i%colcd.length].y, control2.x,  control2.y);
        co = floor(map(control1.y, 0,height, 0,19));
        co = constrain(co, 0,19);
        stroke(colors[co]);
        strokeWeight(1);
        curve(control1.x,  control1.y, colac[i%colac.length].x, colac[i%colac.length].y, colbd[i%colbd.length].x, colbd[i%colbd.length].y, control2.x,  control2.y)
     }

    
     colorstrip.show();
}

