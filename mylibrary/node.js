function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}
Node.prototype.add = function(val) {
    if (this.value == null) {
        this.value = val;
    } else if (val < this.value) {
        if (this.left == null) {
            this.left = new Node(val);
        } else {
            this.left.add(val);
        }
    } else if (val > this.value) {
        if (this.right == null) {
            this.right = new Node(val);
        } else {
            this.right.add(val);
        }
    }
}
Node.prototype.visit = function() {

    if (this.left != null) {
        this.left.visit();
    }
    if (this.right != null) {
        this.right.visit();
    }
}
Node.prototype.search = function(val) {
    var found = false
    if (this.value == val) {
        found = true;

    } else if (this.left != null) {
        this.left.search(val);
    } else if (this.right != null) {
        this.right.search(val);
    }
    return found;
}