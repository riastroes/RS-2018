function Gcode(name, settings) {
    this.bedtemp = settings.bedtemp;
    this.nozzletemp = settings.nozzletemp;
    this.filement = settings.filement;
    this.extrude = 0;
    this.commands = new Array(";RS-2018", ";Ria Stroes", ";" + name, ";");
}

Gcode.prototype.startCode = function() {
    append(this.commands, ";start code");
    if (this.bedtemp > 0) {
        append(this.commands, "M140 S" + this.bedtemp);
    }
    append(this.commands, "M109 T0 S" + this.nozzletemp);
    append(this.commands, "T0");
    if (this.bedtemp > 0) {
        append(this.commands, "M190 S" + this.bedtemp + "           ;bed temperature on");
    }
    append(this.commands, "M109 S" + this.nozzletemp + "          ;extruder temperature on");
    append(this.commands, "G21                ;metric values");
    append(this.commands, "G90                ;absolute positioning");
    append(this.commands, "M107               ;start with the fan off");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "G28 Z0             ;move Z to min endstops");
    append(this.commands, "G0 Z15.0           ;move the platform up 15mm");
    append(this.commands, "G92 E0             ;zero the extruded");
    append(this.commands, "G0 F800            ;speed");
    append(this.commands, "G0 X0 Y0           ;HOME");
    append(this.commands, "G1 F200 E20        ;extrude 10mm of feed stock");
    append(this.commands, "G92 E0             ;zero the extruded length again");
    append(this.commands, "G0 Z10             ;move the platform up 15mm");

    //append(this.commands, "M106            ;fan on");
    append(this.commands, "M117 Printing...");
}
Gcode.prototype.pauseCode = function(sec) {
    append(this.commands, "G4 P" + (sec * 1000));
}
Gcode.prototype.getCode = function(commands) {
    this.commands = concat(this.commands, commands);
}
Gcode.prototype.endCode = function() {
    append(this.commands, ";end code");
    //append(this.commands, "M107               ;fan off");
    append(this.commands, "G1 Z15 F200        ;move Z up a bit");
    append(this.commands, "G91                ;relative positioning");
    //append(this.commands, "M104 S0            ;extruder heater off");
    if (this.bedtemp > 0) {
        //append(this.commands, "M140 S0            ;heated bed heater off");
    }
    append(this.commands, "G1 Z+5 F200        ;move Z up a bit");
    append(this.commands, "G28 X0 Y0          ;move X/Y to min endstops, so the head is out of the way");
    append(this.commands, "M84                ;steppers off");
    append(this.commands, "G90                ;absolute positioning");
}
Gcode.prototype.getCodeToStart = function(skirtlast, knittingfirst, thickness, speed, scale) {
    var tostart = new Array("");

    append(tostart, ";tostart");
    append(tostart, "G1 F" + this.speed);

    var v = p5.Vector.sub(skirtlast, knittingfirst);
    v.mult(app.settings.scale);
    this.extrude += (v.mag() * this.layerheight * this.thickness);
    tostart = append(tostart, "G0  Z3");
    tostart = append(tostart, "G1  X" + (knittingfirst.x * scale) + " Y" + (knittingfirst.y * scale));
    tostart = append(tostart, "G0  Z" + (this.layer * this.layerheight));
    this.commands.concat(tostart);
}


Gcode.prototype.save = function(name) {

    save(this.commands, name + ".gcode");
    console.log(name + " is saved.");
}
Gcode.prototype.generate = function(layers, skirt, knittings) {

    if (skirt != undefined) {
        this.getCode(skirt.commands);
    }

    for (var i = 0; i < knittings.length; i++) {
        if (i < layers.length) {
            this.getCode(layers[i].commands);
        }
        this.getCode(knittings[i].commands);
    }

}

Gcode.prototype.generateLayers = function(layers) {


    for (var i = 0; i < layers.length; i++) {
        this.getCode(layers[i].commands);
    }

}
Gcode.prototype.generateLayer = function(layer) {
    this.getCode(layer.commands);
}