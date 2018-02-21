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

var offset;
var from;
var rups;

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    colorstrip.create(10, "rode_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();
    
    offset = createVector(100,100);


    from = [];
    for(var i = 0; i <50; i++){
        append(from, createVector(500, 500 + (i*2)));
    }
    rups = new Rups(from,  10);
    

   
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
    var power1 = createVector(map(rups.from[0].x, 0,width, 100,-100),map(rups.from[0].y, 0,height, 100,-100));
    var power2 = createVector(random(-100,100),random(-100,100));

    noFill();
    
    from = rups.draw(power1, power2, colors[frameCount%colors.length]);


}

