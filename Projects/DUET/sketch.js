/* Ria Stroes */
/* @created: maart 2018  */
"use strict";

var app;
var openpanel;
var images;
var stamps;
var watermark;
var userischecked;
var isloading;
preloader();

function preloader() {

    var count = 0;
    stamps = [];
    images = [];
    isloading = true;
    for (var i = 1; i <= 8; i++) {
        stamps[i] = new Image();
        stamps[i].onload = function() {
            count++;
        }
        stamps[i].src = "images/stamp" + i.toString() + ".png";

    }
    for (var i = 1; i <= 10; i++) {
        images[i] = new Image();
        images[i].onload = function() {
            count++;
            if (count == 18) { show(); }
        }
        images[i].src = "images/img" + i.toString() + ".jpg";
    }

    watermark = new Image();
    watermark.src = "images/watermark.png";
}

function init() {
    //deze functie wordt direct aangeroepen voor het laden van de afbeelding.
    openpanel = true;
    userischecked = false;
    app = new App();
    app.init();
    app.start();


}

function show() {
    //deze functie wordt aangeroepen als de afbeeldingen geladen zijn.
    isloading = false;
    if (app) {
        app.start();
    }

}