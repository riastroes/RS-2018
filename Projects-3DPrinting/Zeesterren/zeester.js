

function Zeester() {
    this.path = [];
    this.center = createVector(random(450, 550),random(450, 550));
    this.tentakel1 = createVector(800,100);
    this.tentakel2 = createVector(1000,400);
    this.tentakel3 = createVector(600, 900);
    this.tentakel4 = createVector(300, 700);
    this.tentakel5 = createVector(100,100);
    // this.tentakel6 = createVector(random(50,100), random(300, 250));
    // this.tentakel7 = createVector(random(150,200), random(50, 100));
    // this.tentakel8 = createVector(random(width/2, width/2 -50), random(50, 100));


}
Zeester.prototype.print2 = function(i) {
    stroke(0);
    strokeWeight(1);
    noFill();
    var s = 3;
    var cx, cy;

    var s = 3 * i;
    var z = createVector(0,0,(s/3) * 1);
    // for(var c = 0; c < 2 * TWO_PI; c += (TWO_PI /12)){
    //     cx =this.center.x + ((120 - (c * 10)) * cos(c - (PI/2)));
    //     cy =this.center.y + ((120 - (c * 10)) * sin(c - (PI/2)));
    //     append(this.path, createVector(cx, cy).add(z));
    // }

   
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(width*3, this.tentakel1.x, this.tentakel2.x, width*3, t);
        cy = curvePoint(-(height*2), this.tentakel1.y, this.tentakel2.y, -(height*2), t);
        append(this.path, createVector(cx, cy).add(z));
    }
    // for (var t = 0.1; t < 1; t += 0.1) {
    //     cx = curvePoint(width*3, this.tentakel2.x, this.tentakel1.x, width*3, t);
    //     cy = curvePoint(height/2, this.tentakel2.y, this.tentakel1.y, height/2, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(width*2, this.tentakel2.x, this.tentakel3.x, width*2, t);
        cy = curvePoint(height*2, this.tentakel2.y, this.tentakel3.y, height*2, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(0, this.tentakel3.x, this.tentakel4.x, 0, t);
        cy = curvePoint((height*2), this.tentakel3.y, this.tentakel4.y, (height*2), t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(-(width*2), this.tentakel4.x, this.tentakel5.x, -(width*2), t);
        cy = curvePoint( height/2, this.tentakel4.y, this.tentakel5.y,  height/2, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(-(width), this.tentakel5.x, this.tentakel1.x,-(width), t);
        cy = curvePoint( -(height*2), this.tentakel5.y, this.tentakel1.y, -(height*2), t);
        append(this.path, createVector(cx, cy).add(z));
    }
    // for (var t = 0.1; t < 1; t += 0.1) {
    //     cx = curvePoint(width*3, this.tentakel2.x, this.tentakel1.x, width*3, t);
    //     cy = curvePoint(height/2, this.tentakel2.y, this.tentakel1.y, height/2, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.center.x + s, this.tentakel2.x - s,  this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel2.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel2.x - s,  this.center.x + s,  this.center.x, t);
    //     cy = curvePoint(this.center.y, this.tentakel2.y + s, this.center.y, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel3.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel3.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel3.x - s, this.center.x + s,  this.center.x, t);
    //     cy = curvePoint(this.center.y,this.tentakel3.y + s,  this.center.y, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel4.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel4.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1 ; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.tentakel4.x - s, this.center.x + s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.tentakel4.y + s,this.center.y,  this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel5.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel5.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel5.x - s, this.center.x + s,  this.center.x, t);
    //     cy = curvePoint(this.center.y,this.tentakel5.y + s, this.center.y,  this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1 ; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel6.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel6.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel6.x - s, this.center.x + s,  this.center.x, t);
    //     cy = curvePoint(this.center.y, this.tentakel6.y + s,this.center.y,  this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel7.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel7.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel7.x - s, this.center.x + s,  this.center.x, t);
    //     cy = curvePoint(this.center.y,this.tentakel7.y + s, this.center.y,  this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x, this.center.x + s, this.tentakel8.x - s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.center.y, this.tentakel8.y + s, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }
    // for (var t = 0.1 ; t <  1; t += 0.1) {
    //     cx = curvePoint(this.center.x,this.tentakel8.x - s,  this.center.x + s, this.center.x, t);
    //     cy = curvePoint(this.center.y, this.tentakel8.y + s, this.center.y, this.center.y, t);
    //     append(this.path, createVector(cx, cy).add(z));
    // }

}
Zeester.prototype.print = function(i) {
    stroke(0);
    strokeWeight(1);
    noFill();
    var s = 3;
    var cx, cy;

    var s = 3 * i;
    var z = createVector(0,0,(s/3) * 1);
    for(var c = 0; c < 2 * TWO_PI; c += (TWO_PI /12)){
        cx =this.center.x + ((120 - (c * 10)) * cos(c - (PI/2)));
        cy =this.center.y + ((120 - (c * 10)) * sin(c - (PI/2)));
        append(this.path, createVector(cx, cy).add(z));
    }

   
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x, this.tentakel1.x, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel1.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t < 1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel1.x - s,this.center.x + s, this.center.x, t);
        cy = curvePoint(this.center.y, this.tentakel1.y + s, this.center.y, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.center.x + s, this.tentakel2.x - s,  this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel2.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel2.x - s,  this.center.x + s,  this.center.x, t);
        cy = curvePoint(this.center.y, this.tentakel2.y + s, this.center.y, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel3.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel3.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel3.x - s, this.center.x + s,  this.center.x, t);
        cy = curvePoint(this.center.y,this.tentakel3.y + s,  this.center.y, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel4.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel4.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1 ; t += 0.1) {
        cx = curvePoint(this.center.x, this.tentakel4.x - s, this.center.x + s, this.center.x, t);
        cy = curvePoint(this.center.y, this.tentakel4.y + s,this.center.y,  this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel5.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel5.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel5.x - s, this.center.x + s,  this.center.x, t);
        cy = curvePoint(this.center.y,this.tentakel5.y + s, this.center.y,  this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1 ; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel6.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel6.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel6.x - s, this.center.x + s,  this.center.x, t);
        cy = curvePoint(this.center.y, this.tentakel6.y + s,this.center.y,  this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel7.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel7.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel7.x - s, this.center.x + s,  this.center.x, t);
        cy = curvePoint(this.center.y,this.tentakel7.y + s, this.center.y,  this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x, this.center.x + s, this.tentakel8.x - s, this.center.x, t);
        cy = curvePoint(this.center.y, this.center.y, this.tentakel8.y + s, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }
    for (var t = 0.1 ; t <  1; t += 0.1) {
        cx = curvePoint(this.center.x,this.tentakel8.x - s,  this.center.x + s, this.center.x, t);
        cy = curvePoint(this.center.y, this.tentakel8.y + s, this.center.y, this.center.y, t);
        append(this.path, createVector(cx, cy).add(z));
    }

}
Zeester.prototype.drawPrint = function() {

    for (var i = 1; i < this.path.length; i++) {
        line(this.path[i - 1].x, this.path[i - 1].y, this.path[i].x, this.path[i].y);
    }

}