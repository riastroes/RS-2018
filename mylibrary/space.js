//Objecten die in deze space opgenomen kunnen worden.
//moeten een draw-functie ondersteunen.

function Space(spacewidth, spaceheight, cols, rows) {
    this.grid;
    this.cols = cols;
    this.rows = rows;
    this.width = spacewidth;
    this.height = spaceheight;
    this.init();
}
Space.prototype.init = function() {
    let cellwidth = floor(this.width / this.cols);
    let cellheight = floor(this.height / this.rows);
    this.grid = new Array();
    for (let c = 0; c < this.cols; c++) {
        this.grid[c] = new Array();
        for (let r = 0; r < this.rows; r++) {
            this.grid[c][r] = new Cell(c, r, cellwidth, cellheight);
        }

    }
}
Space.prototype.position = function(offset) {
    for (let c = 0; c < this.cols; c++) {
        for (let r = 0; r < this.rows; r++) {
            this.grid[c][r].position(offset);
        }
    }
}
Space.prototype.scaleCells = function(scalex, scaley) {
    for (let c = 0; c < this.cols; c++) {
        for (let r = 0; r < this.rows; r++) {
            this.grid[c][r].scale(scalex, scaley);
        }
    }
}
Space.prototype.set = function(x, y, obj) {
    this.grid[x][y] = obj;
}
Space.prototype.get = function(x, y) {
    return this.grid[x][y];
}

Space.prototype.draw = function(obj) {
    for (let c = 0; c < this.cols; c++) {
        for (let r = 0; r < this.rows; r++) {
            this.grid[c][r].draw(obj);
        }
    }
}


function Cell(c, r, w, h) {
    this.offset = createVector(0, 0);
    this.x = c * w; //top right corner
    this.y = r * h; //top right corner
    this.w = w;
    this.h = h;
    this.obj = null;
    this.center = createVector(floor(this.x + this.w / 2), floor(this.y + this.h / 2));
}
Cell.prototype.position = function(offset) {
    this.offset = offset.copy();
    this.x += offset.x;
    this.y += offset.y;
    this.center = createVector(floor(this.x + this.w / 2), floor(this.y + this.h / 2));

}
Cell.prototype.scale = function(scalex, scaley) {
    this.w = this.w * scalex;
    this.h = this.h * scaley;
    let sx = floor(this.w / 2);
    let sy = floor(this.h / 2);

    this.x = this.center.x - sx;
    this.y = this.center.y - sy;

}
Cell.prototype.draw = function() {
    if(this.obj !=null){
        this.obj.draw();
    }
    else{
        fill(0);
        strokeWeight(10);
        point(this.center.x, this.center.y);
    }
    

}

Cell.prototype.inCell = function(x, y) {
    var found = false;
    if (x > this.x && x < this.x + this.w) {
        if (y > this.y && y < this.y + this.h) {
            found = true;
        }
    }
    return found;
}