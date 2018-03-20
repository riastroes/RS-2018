function PanelStamp(){
    
    this.s1 = function( p ) {
    var img;
    var stamp;

    p.preload = function(){
        img = [];
        
        img[0] = loadImage("images/rad200x200.png");
        img[1] = loadImage("images/blob200x200.png");
        img[2] = loadImage("images/blob2-200x200.png");
        img[3] = loadImage("images/frame200x200.png");
        img[4] = loadImage("images/triangle200x200.png");
    


    }

    p.setup = function() {
        var canvasstamp = p.createCanvas(200,200);
        canvasstamp.parent("panelstamp");
        canvasstamp.background(255,0,0);

        
    }
    p.draw = function() {
        
    }
    
    
};
var my3 = new p5(this.s1, 'c1');
}