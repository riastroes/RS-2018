<%@ language="javascript" %>
<!DOCTYPE html>
<html>

<body>
<h1>Members</h1>
<%  
    var customers;
    loadCustomers();

%>

<%
function loadCustomers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       customers = this.responseText;
      }
    };
    xhttp.open("GET", "data/customers.txt", true);
    xhttp.send();
  }
%>

</body>

</html>