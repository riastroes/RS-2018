function Customer(id) {
    this.id = id.toString();
    this.name;
    this.email;
    this.password;
    this.address;
    this.zipcode;
    this.city;
    this.country;
    this.status = "new";
    var adate = new Date();
    this.creationdate = adate.toString();
    this.changedate = adate.toString();
    this.lastvisitdate = adate.toString();


}
Customer.prototype.getData = function(customer) {

    // document.getElementById("inname").value = customer.name;
    // document.getElementById("inemail").value = customer.email;
    // document.getElementById("inpassword").value = customer.password;
    // document.getElementById("inpassword2").value = customer.password;
    // if (customer.address != undefined) {
    //     document.getElementById("inaddress").value = customer.address;
    // }
    // if (customer.zipcode != undefined) {
    //     document.getElementById("inzipcode").value = customer.zipcode;
    // }
    // if (customer.city != undefined) {
    //     document.getElementById("incity").value = customer.city;
    // }
    // if (customer.country != undefined) {
    //     document.getElementById("incountry").value = customer.country;
    // }

    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.password = customer.password;
    this.address = customer.address;
    this.zipcode = customer.zipcode;
    this.city = customer.city;
    this.country = customer.country;
    this.status = customer.status;
    this.creationdate = customer.creationdate;
    this.changedate = customer.changedate;
    var adate = new Date();
    this.lastvisitdate = adate.toString();

}
Customer.prototype.registration = function(msg) {
    msg = "OK";
    this.name = document.getElementById("inname").value;
    if (document.getElementById("inemail").value.indexOf('@') > 0) {
        this.email = document.getElementById("inemail").value;
    } else {
        msg = "Something is wrong with your email-adress. Please Try again."
        document.getElementById("inemail").value = "";
    }

    if (document.getElementById("inpassword").value == document.getElementById("inpassword2").value) {
        this.password = document.getElementById("inpassword").value;
    } else {
        msg = "Something is wrong with your password. Please Try again.";
        document.getElementById("inpassword").value = "";
        document.getElementById("inpassword2").value = "";
    }
    if (msg == "OK") {
        this.address = document.getElementById("inaddress").value;
        this.zipcode = document.getElementById("inzipcode").value;
        this.city = document.getElementById("incity").value;
        this.country = document.getElementById("incountry").value;
        this.status = "changed";
        var adate = new Date()
        this.changedate = adate.toString();
    }
    customers.saveCustomer(this);
    return msg;
}