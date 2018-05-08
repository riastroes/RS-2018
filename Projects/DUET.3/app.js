function App() {
    this.sidebar = document.getElementById("mySidebar")
    this.menu = document.getElementById("divmenu")
    this.inspiration = document.getElementById("DIVA");
    this.design = document.getElementById("DIVB");


    this.divsettings = document.getElementById("divsettings");
    this.divstampsettings = document.getElementById("divstampsettings");
    this.divinspiration = document.getElementById("divinspiration");
    this.divdesignsteps = document.getElementById("divdesignsteps");
    this.divyourdesigns = document.getElementById("divyourdesigns");
    this.divsave = document.getElementById("divsave");
    this.divsavedesigns = document.getElementById("divsavedesigns");


    this.inspirationbuttons = []
    for (var i = 1; i < 10; i++) {
        this.inspirationbuttons[i] = document.getElementById("inspirationbutton" + i);
        this.inspirationbuttons[i].src = images[i].src;
    }
    this.stampbuttons = []
    for (var i = 1; i < 9; i++) {
        this.stampbuttons[i] = document.getElementById("stampbutton" + i);
        this.stampbuttons[i].src = stamps[i].src;
    }

}

App.prototype.closeSidebar = function() {
    this.sidebar.style.left = (screen.availWidth - 20) + "px";

}

App.prototype.openSidebar = function() {
    this.sidebar.style.left = 0 + "px";


}
App.prototype.openSettings = function() {

    if (this.divsettings.className.toString().indexOf("rs-hidden") >= 0) {
        this.sidebar.style.left = 0 + "px";
        this.divsettings.className = "rs-show"
    }

}
App.prototype.closeSettings = function() {
    if (this.divsettings.className.toString().indexOf("rs-show") >= 0) {
        this.divsettings.className = "rs-hidden"
    }
}
App.prototype.openInspiration = function() {
    if (this.divinspiration.className.toString().indexOf("rs-show") >= 0) {
        this.menu.className = "rs-hidden"
        this.divinspiration.className = "rs-show"
    }

}
App.prototype.closeInspiration = function() {
    if (this.divinspiration.className == "rs-show") {
        this.menu.className = "rs-show"
        this.divinspiration.className = "rs-hidden"
    }
}
App.prototype.openDesigner = function() {
    this.design.scrollIntoView()

}
App.prototype.openStampSettings = function() {
    if (this.divstampsettings.classList.contains("rs-hidden")) {
        this.menu.classList.remove("rs-show");
        this.menu.classList.add("rs-hidden");
        this.inspiration.scrollIntoView();
        this.divstampsettings.classList.add("rs-hidden");
        this.divstampsettings.classList.add("rs-show");
    }

}
App.prototype.closeStampSettings = function() {
    if (event.clientY < screen.height / 2) {
        if (this.divstampsettings.classList.contains("rs-show")) {
            this.menu.classList.remove("rs-hidden");
            this.menu.classList.add("rs-show");
            this.divstampsettings.classList.add("rs-show");
            this.divstampsettings.classList.add("rs-hidden");
        }
    }
}

App.prototype.openDesignSteps = function() {
    if (this.divdesignsteps.className == "rs-hidden") {
        this.menu.className = "rs-hidden"
        this.design.scrollIntoView();
        this.divdesignsteps.className = "rs-show"
    }
}
App.prototype.closeDesignSteps = function() {
    if (this.divdesignsteps.className == "rs-show") {
        this.menu.className = "rs-show"
        this.divdesignsteps.className = "rs-hidden"
    }
}
App.prototype.openYourDesigns = function() {
    if (this.divyourdesigns.className == "rs-hidden") {
        this.divyourdesigns.className = "rs-show"
        this.divyourdesigns.scrollIntoView();
        this.divyourdesings.scrollTop;
    }
}
App.prototype.closeYourDesigns = function() {
    if (this.divyourdesigns.className == "rs-show") {
        this.menu.className = "rs-show"
        this.divyourdesigns.className = "rs-hidden"
    }
}
App.prototype.openSave = function() {
    if (this.divsave.className == "rs-hidden") {
        this.menu.className = "rs-hidden"
        this.divsave.className = "rs-show"
        this.divsavedesigns.className = "rs-show"
        this.design.scrollIntoView();



    }
}
App.prototype.closeSave = function() {
    if (this.divsave.className == "rs-show") {
        this.menu.className = "rs-show"
        this.divsavedesigns.className = "rs-hidden"
        this.divsave.className = "rs-hidden"
    }
}