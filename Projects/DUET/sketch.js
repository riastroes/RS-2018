/* Ria Stroes */
/* @created: maart 2018  */
;
//userdata

var user;
var useremail;

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
    watermark  = new Image();
    watermark.src = "images/watermark.png" ;
}


function start() {

    getUserData();
    maxwidth = calcWidth("panelinspiration");


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

function getUserData() {
    if (window.opener) {
        alert("helo");
        user = window.opener.document.getElementById("inuser").value;
        useremail = window.opener.document.getElementById("inemail").value;
        userpassword = window.opener.document.getElementById("inpassword").value;

        if(user != "" & user != undefined){
        var lbluser = document.getElementById("lbluser");
        lbluser.innerHTML = user;
        }
        else{
            document.location.href= "login.html"
        }

    } else {
       ; document.location.href= "login.html"
    }

}
function unsubscribe(){
    confirm("We are sorry to see you go! Come back any time you like!");
    deleteUser(user, useremail);
}
function deleteUser(user, email){
    console.log("delete this user: " + useremail);
}
function sendDesign(user, email){
    console.log("send design");
    if(this.index > 0){
        design.sendPattern(user, useremail);
    }
}
window.oncontextmenu = function ()
{
   
    design.addWatermark();
    return true;     // cancel default menu
}