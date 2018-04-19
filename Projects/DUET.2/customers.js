function Customers() {
    this.list = [];
}
Customers.prototype.load = function(data) {
    if (data.list) {
        for (var i = 0; i < data.list.length; i++) {
            var acustomer = new Customer(i);
            acustomer.getData(data.list[i]);
            this.list.push(acustomer);
        }
    }
}
Customers.prototype.toString = function() {
    return JSON.stringify(this);
}
Customers.prototype.save = function() {
    var str = this.toString();

    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "data/customers.txt", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(str);
}
Customers.prototype.checkCustomer = function() {
    var ok = false;
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].name == document.getElementById("inlogname").value &&
            this.list[i].email == document.getElementById("inlogemail").value &&
            this.list[i].password == document.getElementById("inlogpassword").value) {
            customer = new Customer(i);
            customer.getData(this.list[i]);
            ok = true;

        }
    }
    if (ok) {
        //fill in registration form
        document.getElementById("inname").value = customer.name;
        document.getElementById("inemail").value = customer.email;
        document.getElementById("inpassword").value = customer.password;
        document.getElementById("inpassword2").value = customer.password;
        document.getElementById("inaddress").value = customer.address;
        document.getElementById("inzipcode").value = customer.zipcode;
        document.getElementById("incity").value = customer.city;
        document.getElementById("incountry").value = customer.country;



    }
    return ok;

}
Customers.prototype.saveCustomer = function() {
    if (customer.status == "new") {
        this.list.push(customer);
    } else if (customer.status == "changed") {
        var i = parseInt(customer.id);
        this.list[i].id = customer.id;
        this.list[i].name = customer.name;
        this.list[i].email = customer.email;
        this.list[i].password = customer.password;
        this.list[i].address = customer.address;
        this.list[i].zipcode = customer.zipcode;
        this.list[i].city = customer.city;
        this.list[i].country = customer.country;
    }
    this.save();



}