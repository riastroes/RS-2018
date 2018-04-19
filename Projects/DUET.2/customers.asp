<!DOCTYPE html>
<html>

<body>

    <%
    dim fs, f, ts
    
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    

    If (fs.FileExists(Server.MapPath("data/test.txt")))=true Then
        Set f=fs.GetFile(Server.MapPath("data/test.txt"))
        Response.Write("<br/>" & "File name: " & f.Name)
        Response.Write("<br/>" & "File created: " & f.DateCreated)
        Response.Write("<br/>" & "File type: " & f.Type)
        Response.Write("<br/>" & "File type: " & f.Size)
        Response.Write("<br/>" & "File attributes: " & f.Attributes)
        Response.Write("<br/>" & "File modified: " & f.DateLastModified)

        
        
        set ts=nothing
        set f = nothing
        
        set fs=nothing
    Else
        Response.Write(Server.MapPath("data/test.txt") + " does not exist.")
    End If

    Server.Execute("error.asp")

%>



</body>

</html>