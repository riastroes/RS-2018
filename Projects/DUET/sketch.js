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
    for (var i = 1; i <= 8; i++) {
        stamps[i] = new Image();
        stamps[i].src = "images/stamp" + i.toString() + ".png";

    }
}


function start() {
    maxwidth = calcWidth("panelinspiration");
    // if (maxwidth < (860)) {
    //     maxwidth = 860;
    // }
    // alert(calcWidth("row") + "= " + calcWidth("panelinspiration") + "+ " + calcWidth("panelstamp"));


    design = new Design(calcWidth("paneldesign") - 16);
    inspiration = new Inspiration(calcWidth("panelinspiration") - 16);
    palette = new Palette(calcWidth("panelpalette") - 16);
    stamp = new Stamp(calcWidth("panelstamp") - 16);

    inspiration.changeInspiration(1);
    palette.add("#ffffff");
    stamp.changeStamp(1);



}

function calcWidth(elementid) {
    var width = document.getElementById(elementid).offsetWidth;
    return width;
}