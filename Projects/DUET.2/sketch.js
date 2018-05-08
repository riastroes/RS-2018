/* Ria Stroes */
/* @created: maart 2018  */
;
//userdata
var customers;
var customer;

var inname;
var inemail;
var inpassword;


//preloading

// inspiration
var inspiration;
var stamp;
var palette;
var design;
var maxwidth;
var images = new Array();
var stamps = new Array();
var showinfo;

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
    watermark = new Image();
    watermark.src = "images/watermark.png";
}


function start() {
    //dit is anders
    //getUserData();
    customers = new Customers();
    maxwidth = calcWidth("panelinspiration");


    design = new Design(calcWidth("paneldesign") - 16);
    inspiration = new Inspiration(calcWidth("panelinspiration") - 16);
    palette = new Palette(calcWidth("panelpalette") - 16);
    stamp = new Stamp(calcWidth("panelstamp") - 16);

    inspiration.changeInspiration(1);
    palette.add("#ffffff");
    stamp.changeStamp(1);
    showinfo = true;



}

function calcWidth(elementid) {
    var width = document.getElementById(elementid).offsetWidth;
    return width;
}

function getCustomerData() {
    document.getElementById("inname").value = document.getElementById("inlogname").value;;
    document.getElementById("inemail").value = document.getElementById("inlogemail").value;;
    document.getElementById("inpassword").value = document.getElementById("inlogpassword").value;;


    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            customers.load(JSON.parse(this.responseText));

            if (customers.checkCustomer()) {
                var login = document.getElementById("login")
                login.style.visibility = "hidden";
                login.style.height = "0px";
                var response = document.getElementById("response");
                response.innerHTML = "Welcome " + customer.name + ", <br/><br/>";
                response.innerHTML += "Have fun designing a lovely new DUET-pattern!";
            } else {
                var response = document.getElementById("response");
                response.className = "w3-text-red";
                response.innerHTML = "Unknown user. You can't save your designs yet.";
                response.innerHTML += "<br/>"
                response.innerHTML += "You have to register first.";
            }


        }
    };
    xhttp.open("GET", "data/customers.txt", true);
    xhttp.send();





}

function unsubscribe() {
    confirm("We are sorry to see you go! Come back any time you like!");
    deleteUser(user, useremail);
}

function deleteUser(user, email) {
    console.log("delete this user: " + useremail);
}

function sendDesign(user, email) {
    console.log("send design");
    design.sendPattern(user, useremail);
}

function toggleInfo() {
    if (showinfo) {
        var elements = document.getElementsByClassName("info");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add("hidden");
        }
        var btn = document.getElementById("btnshowhideinfo");
        btn.value = "show all info";
        showinfo = false;
    } else {
        var elements = document.getElementsByClassName("info");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("hidden");
        }
        var btn = document.getElementById("btnshowhideinfo");
        btn.value = "hide all info";
        showinfo = true;
    }
}

function changeCanvasSize() {
    if (confirm("You will lose your current design.\n Are you sure?")) {
        design = new Design(calcWidth("paneldesign") - 16);
    }

}
window.oncontextmenu = function() {

    var hidischecked = document.getElementById("hidischecked").value
    if (hidischecked == "false") {
        design.addWatermark();
    }

    return true; // cancel default menu
}

function registerCustomer() {

    var msg;
    if (customer == undefined) {
        customer = new Customer(customers.list.length);
    }
    customer.registration(msg)
    document.getElementById("msgregistration").innerHTML = msg;

}