function PanelStamp() {
    var imgstamp;
    var stamp;
    var selectedstampindex;

    this.s3 = function(p) {
        p.preload = function() {
            imgstamp = [];
            imgstamp[0] = loadImage("images/rad200x200.png");
            imgstamp[1] = loadImage("images/blob200x200.png");
            imgstamp[2] = loadImage("images/blob2-200x200.png");
            imgstamp[3] = loadImage("images/frame200x200.png");
            imgstamp[4] = loadImage("images/triangle200x200.png");
        }
        p.setup = function() {
            var canvasstamp = p.createCanvas(200, 200);
            canvasstamp.parent("panelstamp");
            canvasstamp.background(255, 0, 0);
            canvasstamp.onclick = function() {
                console.log(p.mouseX, p.mouseY);

            }
            selectedstampindex = 0;


        }
        p.draw = function() {
            p.image(imgstamp[selectedstampindex], 0, 0);
        }
    };
    this.activepanel = new p5(this.s3, 'c3');
}