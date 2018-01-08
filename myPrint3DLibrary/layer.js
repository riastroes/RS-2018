function Layer(layer, settings, startlayerheight) {
    this.layer = layer;
    this.layerheight = settings.layerheight;
    this.startlayerheight = startlayerheight;
    this.totallayerheight = this.startlayerheight + ((layer + 1) * this.layerheight);

    this.thickness = settings.thickness;
    this.speed = settings.speed;
    this.scale = settings.scale;
    this.commands = new Array(";Layer " + this.layer);
    append(this.commands, ";param layerheight: " + this.layerheight);
    append(this.commands, ";param total layerheight: " + this.totallayerheight);
    append(this.commands, ";param thickness:   " + this.thickness);
    append(this.commands, ";param speed:       " + this.speed);
    append(this.commands, "G0 F" + this.speed);


    this.p = [];
}
Layer.prototype.addPattern = function(offset, pos, path) {

    for (var i = 0; i < path.length; i++) {
        var p = pos.copy();
        p.add(offset);
        p.add(path[i]);

        if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
            append(this.p, p);
        } else {
            console.log("FATAL ERROR IN PRINT");
        }
    }
}

Layer.prototype.addPoint = function(vector) {
    append(this.p, vector);
}

Layer.prototype.add = function(path) {
    for (var i = 0; i < path.length; i++) {
        var p = path[i].copy();
        append(this.p, p);
    }
}


Layer.prototype.change = function(min, max) {
    var r = [];
    for (var i = 1; i < this.p.length; i++) {
        r[0] = random(min, max);
        r[1] = random(min, max);
        this.p[i].x += r[0];
        this.p[i].y += r[1];
    }


}
Layer.prototype.draw = function() {
    strokeWeight(1);
    noFill();
    if (this.p.length > 1) {


        for (var i = 1; i < this.p.length; i++) {


            if (this.p[i].z == 0) {
                stroke(color(0, 0, 255));
            }
            if (this.p[i].z > 0) {
                stroke(colors[2]);
            }
            if (this.p[i].z == -1) {
                stroke(0, 255, 255);
            }

            line(this.p[i - 1].x, this.p[i - 1].y, this.p[i].x, this.p[i].y);


        }

    }
}

Layer.prototype.generate = function(layer, gcode) {
    //var nz = (layer * this.layerheight); // nz = normaal niveau
    var nz = floor(this.totallayerheight * 100) / 100 // nz = normaal niveau;
    append(this.commands, "G0 Z" + nz);


    for (var i = 0; i < this.p.length; i++) {


        var x = this.p[i].x * this.scale;
        x = floor(x * 100) / 100;
        var y = this.p[i].y * this.scale;
        y = floor(y * 100) / 100;
        var z = floor(this.p[i].z * 100) / 100;
        var d;
        if (i > 0) {
            var dvector = p5.Vector.sub(this.p[i], this.p[i - 1]);
            d = dvector.mag() * this.scale;
        } else {
            d = 0;
        }

        if (this.p[i].z == -1) { //transport

            append(this.commands, "G0 X" + x + " Y" + y);


        } else if (z == 0) {
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " Z" + nz + " E" + gcode.extrude);
        } else if (z > 0) {
            z = floor(z * 100) / 100;
            if (this.layer <= 1) {
                z = this.startlayerheight + z;
            } else {
                z = this.startlayerheight + ((this.layer + 1) * this.layerheight) + z;
            }
            gcode.extrude += (d * this.thickness);
            append(this.commands, "G1 X" + x + " Y" + y + " Z" + z + " E" + gcode.extrude);
        }
    }
}