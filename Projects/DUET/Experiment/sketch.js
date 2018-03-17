/* Ria Stroes */
/* @updated: september 2017  */


var canvas;
var issaved;
var colors;
var colorstrip;

var offset;
var imgpixels;

var img;

var isfilterd;
var resultimg;

var softborder;
var canvasinspiration;
var inspiration;

//pattern
var cols;
var rows;

//stamp
var stamp;
var stampwidth;
var stampheight;

var canvassample;

function changeSettings() {
    //layout
    var layout = document.getElementById("layout");
    layout.style.display ="block";
    //canvas
    var canvaswidth = document.getElementById("incanvaswidth");
    var canvasheight = document.getElementById("incanvasheight");
    canvas = createCanvas(parseInt(canvaswidth.value), parseInt(canvasheight.value));
    
    var divcanvas = document.getElementById("divcanvas");
    divcanvas.style.width = (windowWidth - 400) + "px";
    divcanvas.style.height = (windowHeight) + "px";
    canvas.parent(divcanvas);
    
    
    //inspirational image
    
    

    var imginspiration = document.getElementById("inspiration");
    imginspiration.width = 360;
    imginspiration.height = 240;

    var imgbiginspiration = document.getElementById("biginspiration");
    imgbiginspiration.width = 3600;
    imgbiginspiration.height = 2400;
    
    
    canvasinspiration = document.getElementById("canvasinspiration");
    canvasinspiration.width = 360;
    canvasinspiration.height = 240;
    var ctx = canvasinspiration.getContext("2d");

    canvasbiginspiration = document.getElementById("canvasbiginspiration");
    canvasbiginspiration.width = 3600;
    canvasbiginspiration.height = 2400;
    var ctxbig = canvasbiginspiration.getContext("2d");
    
    ctx.drawImage(imginspiration,0,0,imginspiration.width,imginspiration.height);
    ctxbig.drawImage(imgbiginspiration,0,0,imgbiginspiration.width,imgbiginspiration.height);
    inspiration = ctxbig.getImageData(0,0,canvasbiginspiration.width,canvasbiginspiration.height);
    
    canvasinspiration.onclick = function(){
         //
        var i = (floor(event.offsetX-10) * this.width * 4) + (floor(event.offsetX-10) * 4);
        console.log(i);
        
        var param = rgbToHsl(inspiration.data[i], inspiration.data[i + 1], inspiration.data[i + 2]);
        var rgbcolor = color(inspiration.data[i], inspiration.data[i + 1], inspiration.data[i + 2], 255);
        var hslcolor = color(param[0] * 360, param[1] * 100, param[2] * 100);
       
        
        var ahue = hue(hslcolor);
        var range = 30;
        if(ahue >= 0 && ahue <= 360){
            colorstrip.add(hslcolor);
            var x = map(event.offsetX-10, 0, canvasinspiration.width, 0, canvasbiginspiration.width);
            var y = map(event.offsetY-20, 0, canvasinspiration.height, 0, canvasbiginspiration.height);
            stamp.loadInk(canvasbiginspiration, inspiration, floor(x), floor(y), ahue, range);
            stamp.mask(softborder);

            var ctxsample = canvassample.getContext("2d");
    
            var imgData = ctxsample.getImageData(0,0,stampwidth, stampheight );
            for(var i = 0; i < imgData.data.length; i+=4){
                imgData.data[i] = 255;
                imgData.data[i+1] = 255;
                imgData.data[i+2] = 255;
                imgData.data[i+3] = 255;
            }
            stamp.getData(imgData);
            ctxsample.putImageData(imgData, 0,0);
        }
        

         
     }
    //pattern
    cols = document.getElementById("inpatterncols").value;
    rows = document.getElementById("inpatternrows").value;

    //stamp
   

    stampwidth = parseInt(document.getElementById("instampwidth").value);
    stampheight = parseInt(document.getElementById("instampheight").value);
    stamp = new Stamp(stampwidth,stampheight);

    canvassample = document.getElementById("canvassample");
    canvassample.width = stampwidth;
    canvassample.height = stampheight;
    
    var ctxsample = canvassample.getContext("2d");
    
    var imgData = ctxsample.getImageData(0,0,stampwidth, stampheight );
    for(var i = 0; i < imgData.data.length; i+=4){
     imgData.data[i] = 255;
     imgData.data[i+1] = 255;
     imgData.data[i+2] = 255;
     imgData.data[i+3] = 255;
    }
    ctxsample.putImageData(imgData,0,0);
    
    
    

}

function preload() {
    img = [];
    img[0] = loadImage("images/img6.jpg");
    img[1] = loadImage("images/img2.jpg");
    img[2] = loadImage("images/img3.jpg");
    img[3] = loadImage("images/img4.jpg");
    img[4] = loadImage("images/img5.jpg");
    img[5] = loadImage("images/img6.jpg");
    softborder = loadImage("images/softborder200x200.png");
    //softborder = loadImage("images/triangle200x200.png");
}

function setup() {
    pixelDensity(1);
    changeSettings();
    
    var imginspiration = document.getElementById("imgInspiration");
    
   // imginspiration.src =  "images/img6.jpg";
   // imginspiration.width = 300;
   


    colorstrip = new ColorStrip(createVector(0, 0), width, 50);
    //colorstrip.create(10, "lichte_kleuren");
    //colorstrip.setTransparency(0.5);
    colors = colorstrip.colors;
    colorstrip.show();

    offset = createVector(50, 50);
    imgpixels = [];
    



    isfilterd = false;
    issaved = false;
}


function draw() {
    //background(255);


   // if (stamp.isloaded) {

        //stamp.draw(random(-stamp.width/2, this.width + (stamp.width/2)), random(-stamp.height/2, this.height+(stamp.height/2)));
   //}


    colorstrip.show();
}

function mousePressed() {
    if(mouseX >0 && mouseY >0 && mouseX < width && mouseY<height){
        var w = canvas.width/cols;
        var px = (mouseX%w) - (stampwidth/2);
        var h = canvas.height/rows;
        var py = (mouseY%h) - (stampheight/2);
        for(var i = -1; i <= cols; i++){
            for(var j = -1; j <= rows; j++){
                stamp.draw((j*w) + px ,(i*h) + py);
            }
        }
        
    }
    

}


function keyPressed() {
    if (keyCode === BACKSPACE) {
        background(255);
    } else if (keyCode === UP_ARROW) {
        stamp.grow(10);
    } else if (keyCode === DOWN_ARROW) {
        stamp.shrink(10);
    }
}