/* Ria Stroes */
/* @created: maart 2018  */
;


//preloading

// inspiration
var inspiration;
var stamp;
var palette;
var design;

"use strict";


function start() {

    inspiration = new Inspiration();
    palette = new Palette();
    stamp = new Stamp();
    design = new Design();
    inspiration.changeInspiration(1);
    stamp.changeStamp(1);
    stamp.init(200, 200);
    var main = document.getElementById("main");
    calc();



}

function calc() {
    var width = document.getElementById('main').offsetWidth;
    alert(width);
}