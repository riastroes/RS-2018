function Print3D(name, printer, material, style, maxlayers, startlayerheight, maxskirt) {
    this.name = name;
    this.settings = new Settings(printer, material, style);
    this.gcode = new Gcode(name, this.settings);

    this.startlayerheight = startlayerheight;
    this.layers = [];

    this.maxlayers = maxlayers;


    this.createLayers();
    this.last;


}
Print3D.prototype.createLayers = function() {

    for (var l = 0; l < this.maxlayers; l++) {
        this.layers[l] = new Layer(l, this.settings, this.startlayerheight);

    }

}
Print3D.prototype.addToLayer = function(layer, path) {
    this.layers[layer].add(path);
    this.last = path[path.length - 1].copy();
}
Print3D.prototype.addPointToLayer = function(layer, vector) {
    this.layers[layer].addPoint(vector);
    this.last = vector.copy();
}
Print3D.prototype.start = function() {
    this.gcode.startCode();
}
Print3D.prototype.pause = function(sec) {
    this.gcode.pauseCode(sec);
}
Print3D.prototype.stop = function() {
    this.gcode.endCode();
}
Print3D.prototype.save = function() {
    this.gcode.save(this.name);
}
Print3D.prototype.print = function(layer) {
    this.layers[layer].generate(layer, this.gcode); // generate commands
    var acolor = color(0);
    this.layers[layer].draw(acolor);
    this.gcode.generateLayer(this.layers[layer]);
    //this.gcode.generateLayers(this.layers);
}
Print3D.prototype.checkPrint = function(path, minx, miny, maxx, maxy) {
    var ok = true;
    for (var i = 0; i < path.length; i++) {
        if (path[i].x < minx || path[i].x > maxx) {
            console.log("ILLEGAL x(" + path[i].x + "): i= " + i);
            ok = false;
        }
        if (path[i].y < miny || path[i].y > maxy) {
            console.log("ILLEGAL y(" + path[i].y + "): i= " + i);
            ok = false;
        }
    }
    return ok;
}