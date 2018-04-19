<!DOCTYPE html>
<!DOCTYPE html>
<html>

<body>

    <form action="test.asp" method="post">
        First name:
        <input type="text" name="fname" value="Donald" />
        <br> Last name:
        <input type="text" name="lname" value="Duck" />
        <br>
        <input type="submit" value="Submit" />
    </form>

    <form action="test.asp" method="post">
        First name:
        <input type="text" name="frname" value="Donald" />
        <br> Last name:
        <input type="text" name="lrname" value="Duck" />
        <br>
        <input type="submit" value="Submit" />
    </form>

    <%
    Response.Write("<br/>date:" & Date & " " & Request.Form)
    
%>

</body>

</html>