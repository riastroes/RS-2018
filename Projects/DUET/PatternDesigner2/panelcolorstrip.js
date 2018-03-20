function PanelColorstrip() {
    this.colorstrip;

    this.s2 = function(p) {
        p.setup = function() {
            var canvascolorstrip = p.createCanvas(p.windowWidth, 50);
            canvascolorstrip.parent("panelcolorstrip");

            this.colorstrip = new PColorStrip(p, p.createVector(0, 0), canvascolorstrip.width, 50);
            this.colorstrip.add(p.color(0));
            this.colorstrip.add(p.color(255));
            this.colorstrip.show();

        }
        p.draw = function() {
            //this.colorstrip.show();
        }


    };
    this.activepanel = new p5(this.s2, 'c2');
}