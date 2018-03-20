function PanelColorstrip(){
    
    this.s2 = function( p ) {
        
        var colorstrip;

        p.setup = function() {
            var canvascolorstrip = p.createCanvas(p.windowWidth,50);
            canvascolorstrip.parent("panelcolorstrip");

            colorstrip = new PColorStrip(p, p.createVector(0, 0), canvascolorstrip.width, 50);
            colorstrip.add(p.color(0));
            colorstrip.add(p.color(255));
           
           
            
        }
        p.draw = function() {
            colorstrip.show();
        }
        
        
    };
    var my1 = new p5(this.s2, 'c1');
}