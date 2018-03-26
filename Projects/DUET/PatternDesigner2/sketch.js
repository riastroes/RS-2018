/* Ria Stroes */
/* @created: maart 2018  */
;


//preloading

// inspiration
var inspiration;
var stamp;
var palette;
var design;


function start() {
    
    inspiration = new Inspiration();
    palette = new Palette();
    stamp = new Stamp();
    design = new Design();
    inspiration.changeInspiration(1);
    stamp.changeStamp(1);
    

}

function calc(){
    var width = document.getElementById('main').offsetWidth;
    alert(width);
}