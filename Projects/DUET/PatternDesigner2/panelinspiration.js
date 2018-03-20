function PanelInspiration(){
    
   
    
    this.s1 = function( p ) {
        var img;
        var inspiration;
        var selectedindex;

        p.preload = function(){
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
            var canvasinspiration = p.createCanvas(400,300);
            canvasinspiration.parent("panelinspiration");
            canvasinspiration.mousePressed = clickInspiration;
            selectedindex = 0;

            
            
        }
        p.draw = function() {
            p.image(img[selectedindex], 0,0);
        }
        function clickInspiration(){
          alert("hoi");
        }
        
    };
    var my2 = new p5(this.s1, 'c1');

    this.select  = function(i){
        selectedindex = parseInt(i);
    }
}