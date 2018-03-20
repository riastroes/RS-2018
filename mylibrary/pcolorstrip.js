function PColorStrip(p, pos, w, h) {
    this.p  =p;
    this.p.colorMode(this.p.HSB, 360, 100, 100, 1);
    this.pos = pos.copy(); // posititie van de kleurenstrip
    this.palwidth = w; // de breedte van de kleurenstrip
    this.palheight = h; // de hoogte van de kleurenstrip 
    this.palette = new Color(); // alle kleurfuncties
    this.colors = this.palette.colors;
    this.color = this.colors[0]; // de gekozen kleur
    this.max = this.colors.length; // het aantal kleuren
    this.alpha = 1;
    this.isclicked = false;
    this.next = 0;

}
PColorStrip.prototype.create = function(max, name) {

    this.max = max;
    switch (name) {

        case "basis_kleuren":
            {
                if (max > 10) { max = 10; }
                this.palette.create(max);
                this.colors = this.palette.colors;
                break;
            }
        case "grijze_kleuren":
            {
                if (max > 10) { max = 10; }
                this.palette.addGrayPalette(max);
                this.colors = this.palette.colors;
                break;
            }
        case "random_kleuren":
            {
                if (max > 10) { max = 10; }
                this.palette.random(max, 1);
                this.colors = this.palette.colors;
                break;
            }
        case "rode_kleuren":
            {
                this.palette.addHuePalette(max, 0);
                this.colors = this.palette.colors;
                break;
            }
        case "oranje_kleuren":
            {
                this.palette.addHuePalette(max, 30);
                this.colors = this.palette.colors;
                break;
            }

        case "gele_kleuren":
            {
                this.palette.addHuePalette(max, 60);
                this.colors = this.palette.colors;
                break;
            }
        case "groene_kleuren":
            {
                this.palette.addHuePalette(max, 90);
                this.colors = this.palette.colors;
                break;
            }
        case "blauwe_kleuren":
            {
                this.palette.addHuePalette(max, 220);
                this.colors = this.palette.colors;
                break;
            }
        case "paarse_kleuren":
            {
                this.palette.addHuePalette(max, 270);
                this.colors = this.palette.colors;
                break;
            }
        case "violet_kleuren":
            {
                this.palette.addHuePalette(max, 330);
                this.colors = this.palette.colors;
                break;
            }
        case "lichte_kleuren":
            {
                this.colors = this.palette.addLightnessPalette(max, 90);
                break;
            }
        case "felle_kleuren":
            {
                this.colors = this.palette.addLightnessPalette(max, 50);
                break;
            }
        case "donkere_kleuren":
            {
                this.colors = this.palette.addLightnessPalette(max, 20);
                break;
            }

        default:
            {
                this.colors = this.palette.colors; // black and white
            }

    }
    this.color = this.colors[0];
    this.max = this.colors.length;

}
PColorStrip.prototype.add = function(acolor) {
    this.palette.add(acolor);
    this.color = this.colors[this.colors.length - 1];
    this.max = this.colors.length;
}
PColorStrip.prototype.show = function() {
    this.p.noStroke();
    this.p.fill(255);
    this.p.rect(this.pos.x, this.pos.y, this.palwidth, this.palheight);
    for (var i = 0; i < this.max; i++) {

        this.p.fill(this.colors[i]);
        if (this.palwidth < this.palheight) {
            //vertikaal
            this.p.rect(this.pos.x, this.pos.y + (i * this.palheight / this.max), this.palwidth, this.palheight);

        } else {
            //horizontaal
            this.p.rect(this.pos.x + (i * this.palwidth / this.max), this.pos.y, (this.palwidth / this.colors.length) - 1, this.palheight);
        }
    }
}
PColorStrip.prototype.getColor = function(x, y) {
    var i = floor(x / (this.p.width / this.colors.length));
    return this.colors[i];
}
PColorStrip.prototype.randomColor = function(show) {
    var max = this.colors.length;
    var index = floor(p.random(max));

    if (show) {
        this.show();
        this.p.stroke(0);
        this.p.fill(this.colors[index]);
        this.p.rect(this.pos.x + (index * this.palwidth / this.max) - 1, this.pos.y, (this.palwidth / this.colors.length), this.palheight - 1);
    }
    return this.colors[index];
}
PColorStrip.prototype.nextColor = function(show) {
    let index = this.next % this.colors.length;
    if (show) {
        this.show();
        this.p.stroke(0);
        this.p.fill(this.colors[index]);
        this.p.rect(this.pos.x + (index * this.palwidth / this.max) - 1, this.pos.y, (this.palwidth / this.colors.length), this.palheight - 1);
    }
    this.next++;
    return this.colors[index];
}
PColorStrip.prototype.setTransparency = function(alpha) {
    this.alpha = alpha;
    this.palette.setTransparency(alpha);
    for (var i = 0; i < this.colors.length; i++) {
        this.colors[i] = this.p.color(this.p.hue(this.colors[i]), this.p.saturation(this.colors[i]), this.p.lightness(this.colors[i]), this.alpha);
    }
}
PColorStrip.prototype.isClicked = function(x, y, show) {
    var index = 0;
    this.isclicked = false;
    if (x > this.pos.x && x < this.pos.x + this.palwidth && y > this.pos.y && y < this.pos.y + this.palheight) {
        this.isclicked = true;
        if (this.palwidth < this.palheight) {
            //vertikaal
            var cellheight = this.palheight / this.colors.length;
            index = floor((y - this.pos.y) / cellheight);
        } else {
            //horizontaal
            var cellwidth = this.palwidth / this.colors.length;
            index = floor((x - this.pos.x) / cellwidth);
        }
        this.color = this.colors[index];
    }

    if (this.isclicked && show) {
        this.show();
        this.p.stroke(0);
        this.p.fill(this.color);
        if (this.palwidth < this.palheight) {
            //vertikaal
            this.p.rect(this.pos.x, this.pos.y + (index * this.palheight / this.max), this.palwidth, (this.palheight / this.colors.length));
        } else {
            //horizontaal
            this.p.rect(this.pos.x + (index * this.palwidth / this.max), this.pos.y, (this.palwidth / this.colors.length), this.palheight);
        }
    }
    return this.isclicked;

}
PColorStrip.prototype.getIndex = function(acolor) {
    var index = 0;
    for (var i = 0; i < this.colors.length; i++) {
        if (this.palette.compare(acolor, this.colors[i], 0)) {
            index = i;
            break;
        }
    }
    return index;
}
PColorStrip.prototype.clearBackground = function(show) {
    background(255);
    if (show) {
        this.show();
        this.p.stroke(0);
        this.p.fill(this.color);
        var index = this.getIndex(this.color);
        this.p.rect(this.pos.x + (index * this.palwidth / this.max) - 1, this.pos.y, (this.palwidth / this.colors.length), this.palheight - 1);
    }
}