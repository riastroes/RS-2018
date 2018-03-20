var panelcolorstrip;
var panelinspiration;
var panelstamp;
var bigx;
var bigy;
var factor;


function setup() {
    pixelDensity(1);
    factor = 5;
    panelcolorstrip = new PanelColorstrip();
    panelinspiration = new PanelInspiration();
    panelstamp = new PanelStamp();


}

function draw() {

}

function changeInspiration(nr) {
    panelinspiration.select(nr);
}