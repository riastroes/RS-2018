function Tree() {
    this.root = null;
}
Tree.prototype.add = function(val) {

    if (this.root == null) {
        this.root = new Node(val);
    } else {
        this.root.add(val);
    }
}
Tree.prototype.search = function(val) {
    this.root.search(val);
}
Tree.prototype.visit = function() {
    this.root.visit();
}