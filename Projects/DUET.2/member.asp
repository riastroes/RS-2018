<!DOCTYPE html>
<html>
<style>
    td {
        padding: 10px;
    }
</style>

<body>
    <h1>Member Designs</h1>

    <%
    dim useremail

    set useremail = Request.QueryString("useremail")
    Response.Write(useremail)

    dim fs, userfolder,f, ts
    set fs=Server.CreateObject("Scripting.FileSystemObject")  
    set userfolder=fs.GetFolder(Server.MapPath("data/" & useremail))
    
    'Print the name of all files in the test folder
    Response.write("<table>")
    Response.write("<tr><td>File</td><td>User</td><td>Password</td><td>Created</td><td>Changed</td><td>Accessed</td></tr>")
    for each x in userfolder.Files
        If InStr(x.Name, ".txt") > 0 Then
            set f= fs.OpenTextFile(Server.MapPath("data/" & useremail & "/" & x.Name),1,false)
            Response.write("<tr><td>" & x.Name & "</td><td>" & Replace(x.Name, ".txt", "") & "</td><td>" & f.ReadAll & "</td><td>" & x.DateCreated & "</td><td>" & x.DateLastModified & "</td><td>" & x.DateLastAccessed & "</td></tr>")
            f.close
            set f = nothing
        Else
            Response.write("<tr><td>" & x.Name & "</td><td></td><td></td><td>" & x.DateCreated & "</td><td>" & x.DateLastModified & "</td><td>" & x.DateLastAccessed & "</td></tr>")
        End If
    next
    Response.write("</table>")

    
    set userfolder = nothing
    set fs=nothing

    Server.Execute("error.asp")
%>


</body>

</html>