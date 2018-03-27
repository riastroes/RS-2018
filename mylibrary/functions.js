//general functions

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}
function convertCanvasToImage(canvas, callback) {
    var image = new Image();
    image.onload = function(){
      callback(image);
    }
    image.src = canvas.toDataURL("image/jpeg", 1.0);
  }