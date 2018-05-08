<%
If Session("user") <> "" Then

    dim fs, userfolder,f, ts, nr
    set fs=Server.CreateObject("Scripting.FileSystemObject")  
    set userfolder=fs.GetFolder(Server.MapPath("data/" & Session("useremail")))
    nr = 0
    'Print the name of all files in the test folder
    Response.write("<table>")
    Response.write("<tr><td>File</td><td>Created</td><td></td><td>Open</td><td>Order</td></tr>")
    for each x in userfolder.Files
        If InStr(x.Name, Session("user")) > 0 Or nr > 0 Then
            'password
        Else
        'voorlopig haal ik er maar 1 op.
            nr = nr + 1
            set f= fs.OpenTextFile(Server.MapPath("data/" & Session("useremail") & "/" & x.Name),1,false)
            Response.write("<tr><td>" & x.Name & "</td><td>" & x.DateCreated & "</td>")
            Response.write("<tr><td><img id='nr" & nr & "' src='data:image/png;base64," & f.ReadLine & "' alt='" & x.Name & "' class='smallimg' ></td>")
            Response.write("<td><input type='button' class='btnopen' onclick='app.openDuetPattern(&quot;nr" & nr & "&quot;)' value='open' /></td>" )
            Response.write("<td><input type='button' class='btnorder' onclick='app.orderDuetPattern(&quot;nr" & nr & "&quot;)' value='order' /></td>" )
            Response.write("</tr>")
            f.close
            set f = nothing
        End If
    next
    Response.write("</table>")

    
    set userfolder = nothing
    set fs=nothing

End If
%>