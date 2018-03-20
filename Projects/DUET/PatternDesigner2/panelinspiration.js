function PanelInspiration() {
    var img;
    var inspiration;
    var imginspirationindex;
    var canvasinspiration;
    var x, y;




    this.s1 = function(p) {

        p.preload = function() {
            img = [];
            img[0] = loadImage("images/img1.jpg");
            img[1] = loadImage("images/img2.jpg");
            img[2] = loadImage("images/img3.jpg");
            img[3] = loadImage("images/img4.jpg");
            img[4] = loadImage("images/img5.jpg");
            img[5] = loadImage("images/img6.jpg");
            img[6] = loadImage("images/img7.jpg");
            img[7] = loadImage("images/img8.jpg");
            img[8] = loadImage("images/img9.jpg");
            img[9] = loadImage("images/img10.jpg");
        }

        p.setup = function() {
            canvasinspiration = p.createCanvas(400, 300);
            canvasinspiration.parent("panelinspiration");
            imginspirationindex = 0;
            x = 0;
            y = 0;

        }
        p.draw = function() {
            p.image(img[imginspirationindex], 0, 0);
            p.fill(255, 0, 0);
            p.ellipse(x, y, 10, 10);
        }
        p.mousePressed = function() {
            x = floor(p.mouseX);
            y = floor(p.mouseY);
            bigx = x * factor;
            bigy = y * factor;
        }

    };
    this.activepanel = new p5(this.s1, 'c1');

    this.select = function(i) {
        imginspirationindex = parseInt(i) - 1;
    }


}