function Path(){
    this.path = [];
}
Path.prototype.pointOnLine = function(a, b, t){
    var p = createVector(0,0);
    p.x = curvePoint(a.x, a.x, b.x, b.x, t);
    p.y = curvePoint(a.y, a.y, b.y, b.y, t);
    return p;
}
Path.prototype.pointsOnLine = function(a, b, count){
    var apath = [];
    for(var i = 0; i < count; i++){
        append(apath,this.pointOnLine(a,b, i/count));
    }
    return apath;
}
Path.prototype.pointOnCurve = function(control1, a, b, control2, t){
    var p = createVector(0,0);
    p.x = curvePoint(control1.x, a.x, b.x, control2.x, t);
    p.y = curvePoint(control1.y, a.y, b.y, control2.y, t);
    return p;
}
Path.prototype.pointsOnCurve = function(control1, a, b, control2, count){
    var apath = [];
    for(var i = 0; i < count; i++){
        append(apath, this.pointOnCurve(control1, a, b, control2, i/count));
    }
    return apath;
}