<% 
If Session("user") <> "" Then
    
    Response.write("<p>Hi " &  Session("user") & ",<br/><br/>")
    Response.write("We hope you will enjoy DUET and create beautifull patterns")
    Response.write(" and order our lovely fabrics with your own design.<br/>")
    Response.write("On the right side you see some beautifull skarfs of Jolanta. ")
    Response.write("We used these skarfs as an inspiration source for this patterndesigner. ")
    Response.write("You can use these skarfs to create a stamp and with this stamp you can design your own patterns. ")
    Response.write("You will find all the information within this tool.<br/><br/>Have fun designing!")
    Response.write("<br/><br/>With regards,<br/>Jolanta and Ria</p>")
    
End If
%>