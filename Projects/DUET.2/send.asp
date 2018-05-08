<!DOCTYPE html>
<html>

<body>

    <%
    dim fs, f
    
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    

    If (fs.FileExists(Server.MapPath("data/" & useremail & ".txt")))=true Then
        Response.Write("<h1>Logbook</h1>")
        set f = fs.OpenTextFile(Server.MapPath("data/log.txt"), 1)
        Response.Write(f.ReadAll)
        f.Close
        
        set f = nothing
        set fs= nothing
    Else
        Response.Write(Server.MapPath("data/log.txt") + " does not exist.")
    End If

    

%>



</body>

</html>