/* Ria Stroes */
/* @created: maart 2018  */
;


//preloading

// inspiration
var inspiration;
var stamp;
var palette;
var design;
var maxwidth;
var images = new Array();
var stamps = new Array();

"use strict";
preloader();

function preloader() {


    for (var i = 1; i <= 10; i++) {
        images[i] = new Image();
        images[i].src = "images/img" + i.toString() + ".jpg";

    }
    for (var i = 1; i <= 7; i++) {
        stamps[i] = new Image();
        stamps[i].src = "images/stamp" + i.toString() + ".png";

    }
}


function start() {
    maxwidth = calcWidth("main");
    if (maxwidth < (1040)) {
        maxwidth = 1040;
    }

    design = new Design(maxwidth - 40);
    inspiration = new Inspiration((maxwidth / 3 * 2) - 40);
    palette = new Palette(maxwidth - 40);
    stamp = new Stamp((maxwidth / 4) - 20);

    inspiration.changeInspiration(1);
    palette.add("#ffffff");
    stamp.changeStamp(1);



}

function calcWidth(elementid) {
    var width = document.getElementById(elementid).offsetWidth;
    return width;
}