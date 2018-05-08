function App() {
    this.title = document.getElementById("title");

    this.openpanel = false;
    this.resolution = 300; //300 dpi (1 cm : 118 pixels)
    this.dpi = 118;
    this.scale = (100 / this.dpi); // * window.devicePixelRatio;

    //design
    this.divdesign = document.getElementById("divdesignframe");
    this.divdesignwidth = calcWidth(this.divdesign) * this.scale;
    this.divdesignheight = calcHeight(this.divdesign) * this.scale;

    //panel
    this.bar = document.getElementById("divbar");
    this.panel = document.getElementById("divpanel");
    this.loginpanel = document.getElementById("divlogin");
    this.btnlogin = document.getElementById("btnlogin");

    this.welcomeuserpanel = document.getElementById("divwelcomeuser");
    this.hiduserischecked = document.getElementById("hiduserischecked");
    this.animation = document.getElementById("divanimation");
    this.menupanel = document.getElementById("divmenu");

    //inspiration
    this.inspirationpanel = document.getElementById("divinspiration");
    this.canvasinspiration = document.getElementById("canvasinspiration");

    //canvas settings
    this.designpanel = document.getElementById("divdesignframe");
    this.infosize = document.getElementById("btnsizeinfo");
    this.infotextsize = document.getElementById("divsizeinfo");
    this.canvassettingspanel = document.getElementById("divcanvassettings");
    this.canvassettings = document.getElementById("canvassettings");
    this.inrangecanvaswidth = document.getElementById("inrangecanvaswidth");
    this.inrangecanvasheight = document.getElementById("inrangecanvasheight");
    this.lblcanvaswidth = document.getElementById("lblcanvaswidth");
    this.lblcanvasheight = document.getElementById("lblcanvasheight");

    this.btncanvassettings = document.getElementById("btncanvassettings");
    this.oldcanvaswidth;
    this.oldcanvasheight;
    //stamp settings
    this.stampsettingspanel = document.getElementById("divstampsettings");
    this.stampsettings = document.getElementById("stampsettings");
    this.btnstampsettings = document.getElementById("btnstampsettings");
    //save design
    this.savedesign = document.getElementById("savedesign");
    this.savedesignpanel = document.getElementById("divsavedesign");
    this.btnsavedesignclose = document.getElementById("btnsavedesignclose");
    this.btnsavedesign = document.getElementById("btnsavedesign");
    this.saveinstruction = document.getElementById("saveinstruction");
    this.saveddesignspanel = document.getElementById("divsaveddesigns");
    this.designismade;

}
App.prototype.init = function() {
    //bar
    this.bar.addEventListener("mouseover", this.callTogglePanel);

    //this.panel.addEventListener("click", this.callClosePanel);
    //this.btnlogin.addEventListener("click", this.callLogin);
    //design

    //stamp
    this.stampsettings.addEventListener("click", this.callOpenStampSettings);
    this.btnstampsettings.addEventListener("click", this.callCloseStampSettings);
    this.stamp = new Stamp();
    this.stamp.init(3, 3, 1, 1);

    //intro
    this.panelwidth = calcWidth(this.animation);
    this.panelheight = screen.availHeight; //calcHeight(this.animation);
    //canvas settings
    this.canvassettingspanel.addEventListener("click", this.callEditCanvasSettings);
    this.canvassettings.addEventListener("click", this.callOpenCanvasSettings);
    this.btncanvassettings.addEventListener("click", this.callCloseCanvasSettings);
    let w = Math.floor(calcWidth(this.designpanel) / this.dpi);
    let h = Math.floor(calcHeight(this.designpanel) / this.dpi);
    this.inrangecanvaswidth.value = w;
    this.inrangecanvasheight.value = h;


    this.design = new Design();
    this.design.init(w, h);

    this.palette = new Palette();
    this.palette.init();
    this.infosize.addEventListener("click", this.toggleInfoSize);
    this.infotextsize.addEventListener("click", this.hideInfoSize);
    this.infotextsize.style.display = "none";


    //save design
    this.savedesign.addEventListener("click", this.callOpenSaveDesign);
    this.btnsavedesignclose.addEventListener("click", this.callCloseSaveDesign);
    this.designismade = false;

}
App.prototype.start = function() {


    if (this.hiduserischecked.value == "false" || isloading) {
        this.intro = new Intro(this.panelwidth, this.panelheight);
        this.intro.init();
    } else {
        if (sessionStorage.getItem("filename") != "" &&
            sessionStorage.getItem("filename") != null) {

            this.design.name = [];
            this.design.id = [];
            this.design.dataURL = [];
            this.design.index = 1;
            this.design.id[0] = hidfile.value;
            this.design.name[0] = hidfile.value;
            this.design.dataURL[0] = sessionStorage.getItem("file");
            //design.ctxtemp.drawImage(design.dataURL[0], 0, 0);
            //design.ctx.drawImage(app.design.canvastemp, 0, 0);
            this.callClosePanel();
        }
        this.openInspirationPanel();
    }

}
App.prototype.callTogglePanel = function() {
    if (app.openpanel == false) {
        app.panel.style.left = (calcWidth(app.panel) - 20) + "px";
        //app.bar.style.left = (screen.availWidth - 20) + "px";
        app.openpanel = true;
    } else {
        app.panel.style.left = "0px";
        app.bar.style.left = "0px";
        app.openpanel = false;
    }
}
App.prototype.callClosePanel = function() {
    if (app.openpanel == true && event.offsetX < 2) {
        app.panel.style.left = (calcWidth(app.panel) - 20) + "px";
        app.openpanel = false;
    }
    return app.stop();
}
App.prototype.callOpenPanel = function() {
    if (app.openpanel == false) {
        app.panel.style.left = 0 + "px";
        app.panel.style.right = 0 + "px";
        app.openpanel = true;

    }
    return app.stop();
}
App.prototype.callLogin = function() {
    //asp login script zet hidden input


    /* nu handmatig */
    userischecked = true;
    /* later door ASP script */
    if (userischecked) {
        app.loginpanel.style.display = "none";
        app.menupanel.style.display = "block";
        app.start();
    }
    return app.stop();

}

App.prototype.callOpenStampSettings = function() {

    app.openpanel = true;
    app.welcomeuserpanel.style.display = "none";
    app.menupanel.style.display = "none";
    app.stampsettingspanel.style.display = "block";

    app.stamp.imgfilter = stamps[app.stamp.nr];
    app.stamp.ctx.drawImage(app.stamp.imgfilter, 0, 0, app.stamp.imgfilter.naturalWidth, app.stamp.imgfilter.naturalHeight, 0, 0, app.stamp.width, app.stamp.height);
    app.stamp.filter = app.stamp.ctx.getImageData(0, 0, app.stamp.width, app.stamp.height); //filter
    return app.stop();
}
App.prototype.callCloseStampSettings = function() {


        app.openpanel = false;
        app.stampsettingspanel.style.display = "none";
        app.menupanel.style.display = "block";
        return app.stop();
    }
    /*  canvas settings */
App.prototype.callOpenCanvasSettings = function() {


    app.openpanel = true;
    app.palette.show();
    let w = Math.floor(app.design.width / app.dpi);
    let h = Math.floor(app.design.height / app.dpi);
    app.oldcanvaswidth = w;
    app.oldcanvasheight = h;
    app.lblcanvaswidth.innerHTML = " " + w + " cm";
    app.lblcanvasheight.innerHTML = " " + h + " cm";
    app.inrangecanvaswidth.value = w;
    app.inrangecanvasheight.value = h;
    app.welcomeuserpanel.style.display = "none";
    app.menupanel.style.display = "none";
    app.canvassettingspanel.style.display = "block";
    return app.stop();
}
App.prototype.callCloseCanvasSettings = function() {

    app.openpanel = false;
    if (app.inrangecanvaswidth.value != app.oldcanvaswidth ||
        app.inrangecanvasheight.value != app.oldcanvasheight) {
        if (confirm("Do you want to change your canvas?") == true) {
            app.design.changeCanvasSize();

        } else {
            app.inrangecanvaswidth.value = app.design.width;
            app.inrangecanvasheight.value = app.design.height;
            app.lblcanvaswidth.innerHTML = app.design.width + " cm";
            app.lblcanvasheight.innerHTML = app.design.height + " cm";

        }
    }

    app.canvassettingspanel.style.display = "none";
    app.menupanel.style.display = "block";
    return app.stop();
}
App.prototype.callEditCanvasSettings = function() {
    app.lblcanvaswidth.innerHTML = app.inrangecanvaswidth.value + " cm";
    app.lblcanvasheight.innerHTML = app.inrangecanvasheight.value + " cm";
    return app.stop();
}

App.prototype.callToggleInfoSize = function() {

    if (app.infotextsize.style.display == "none" ||
        app.infotextsize.style.display == undefined ||
        app.infotextsize.style.display == "") {
        app.infotextsize.style.display = "block";
    } else {
        app.infotextsize.style.display = "none";
    }
    return app.stop();
}
App.prototype.callHideInfoSize = function() {
    app.infotextsize.style.display = "none";
    return app.stop();
}
App.prototype.openInspirationPanel = function() {
    this.inspiration = new Inspiration(this.panelwidth, this.panelheight); // - (50 + 90));
    this.inspiration.init();
    this.inspiration.draw();

    this.inspirationpanel.style.display = "block";
    this.animation.style.display = "none";
    this.loginpanel.style.display = "none";
    this.welcomeuserpanel.style.display = "block";
    this.menupanel.style.display = "block";
}
App.prototype.stop = function() {
    if (event.stopPropagation) { // standard
        event.stopPropagation();
        event.preventDefault();
    } else { // IE6-8
        event.cancelBubble = true;
        event.preventDefault();
    }
    return false;
}
App.prototype.callOpenSaveDesign = function() {

    app.welcomeuserpanel.style.display = "none";
    app.menupanel.style.display = "none";
    app.savedesignpanel.style.display = "block";
    app.inspirationpanel.style.display = "none";
    app.saveddesignspanel.style.display = "block";


    if (app.designismade) {
        app.saveinstruction.innerHTML = "You can save your design and come back later to work on it or you can order our fabric with your own design!"
        app.btnsavedesign.style.visiblility = "visible";
    } else {
        app.saveinstruction.innerHTML = "First you have to create a design. Come back if you are ready, then you can save your design."
        app.btnsavedesign.style.visiblility = "hidden";
    }
    return app.stop();


}
App.prototype.callCloseSaveDesign = function() {
    app.saveddesignspanel.style.display = "none"
    app.menupanel.style.display = "block";
    app.savedesignpanel.style.display = "none";
    app.inspirationpanel.style.display = "block";


    return app.stop();

}
App.prototype.openDuetPattern = function(id) {
    //var SesVar = <%= Session("file") %>
    this.design.dataURL = []
    this.design.id = []
    this.design.name = []
    this.index = 1
    this.design.dataURL[0] = document.getElementById(id).src;
    this.design.id[0] = document.getElementById(id).id;
    this.design.name[0] = document.getElementById(id).alt;
    this.design.ctxtemp.drawImage(document.getElementById(id), 0, 0);
    this.design.ctx.drawImage(this.design.canvastemp, 0, 0);

    this.panel.style.left = (calcWidth(this.panel) - 20) + "px";
    this.openpanel = false;
}
App.prototype.orderDuetPattern = function(filename) {

    this.saveddesignspanel.style.display = "none";
    document.write(filename);
    document.write("<br/>hier komt de order om weer terug te gaan naar saveddesignpanel");
}