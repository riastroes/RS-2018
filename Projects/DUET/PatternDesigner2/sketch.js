var panelcolorstrip;
var panelinspiration;
var panelstamp;


function setup(){
    pixelDensity(1);
        
    panelcolorstrip = new PanelColorstrip();
    panelinspiration = new PanelInspiration();
    panelstamp = new PanelStamp();
}
function draw(){
        
}

function changeInspiration(nr){
    panelinspiration.select(nr);
}