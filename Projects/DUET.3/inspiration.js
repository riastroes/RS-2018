function Inspiration(mwidth) {
    this.width = Math.floor(mwidth);
    this.width -= (this.width % 2);
    this.height = Math.floor(mwidth / 4 * 3);
    this.height -= (this.height % 2);
    this.canvas = document.getElementById("canvasinspiration");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    this.nr = 1;
    this.inspirationData;
    this.pixelData;


    this.rgb;
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.stamptype = "hue";
}


Inspiration.prototype.changeInspiration = function(nr) {
    this.nr = parseInt(nr);

    this.ctx.drawImage(images[this.nr], 0, 0, images[this.nr].naturalWidth, images[this.nr].naturalHeight, 0, 0, this.width, this.height);
    this.inspirationData = this.ctx.getImageData(0, 0, this.width, this.height);
    event.cancelBubble = true;


}
Inspiration.prototype.loadStamp = function(ischanged) {
    if (ischanged) {
        this.x = event.offsetX;
        this.y = event.offsetY;
    }

    var instamptypes = document.getElementsByName("instamptype");
    for (var i = 0; i < instamptypes.length; i++) {
        if (instamptypes[i].checked) {
            this.stamptype = instamptypes[i].value;
        }
    }



    var sx = (stamp.width / 2);
    var sy = (stamp.height / 2);

    this.pixelData = this.ctx.getImageData(this.x, this.y, 1, 1);

    this.rgb = new RGB(this.pixelData.data[0], this.pixelData.data[1], this.pixelData.data[2]);


    palette.add(this.rgb.color);

    var count = 0;

    this.inspirationData = this.ctx.getImageData(this.x - sx, this.y - sy, stamp.width, stamp.height);
    // var pixels = this.inspirationData.data;
    // for (var i = 0; i < pixels.length; i += 4) {
    //     if (this.stamptype == "hue") {
    //         this.hue = this.rgb.hue();
    //         var hue = new RGB(pixels[i], pixels[i + 1], pixels[i + 2]).hue();
    //         if (this.hue - 30 >= hue && this.hue + 30 <= hue) {
    //             pixels[i + 3] = 255;
    //         } else {
    //             pixels[i + 3] = 0;
    //         }
    //     } else if (this.stamptype == "saturation") {
    //         this.saturation = this.rgb.saturation();
    //         var saturation = new RGB(pixels[i], pixels[i + 1], pixels[i + 2]).saturation();
    //         if (this.saturation - 10 >= saturation && this.saturation + 10 <= saturation) {
    //             pixels[i + 3] = 255;
    //         } else {
    //             pixels[i + 3] = 0;
    //         }
    //     } else if (this.stamptype == "lightness") {
    //         this.lightness = this.rgb.lightness();
    //         var lightness = new RGB(pixels[i], pixels[i + 1], pixels[i + 2]).lightness();
    //         if (this.lightness - 10 >= lightness && this.lightness + 10 <= lightness) {
    //             pixels[i + 3] = 255;
    //         } else {
    //             pixels[i + 3] = 0;
    //         }
    //     } else if (this.stamptype == "copy") {
    //         if (pixels[i + 3] != 0) {
    //             pixels[i + 3] = 255;
    //         } else {
    //             pixels[i + 3] = 0;
    //         }
    //     }
    // }
    // this.inspirationData.data = pixels;
    stamp.loadStamp(this.inspirationData, this.stamptype, this.rgb);


}