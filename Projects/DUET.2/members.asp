<!DOCTYPE html>
<html>

<body>

    <%
    dim fs, f,  f3
    
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    

    If (fs.FileExists(Server.MapPath("data/customers.txt")))=true Then
        
        

        set f = fs.OpenTextFile(Server.MapPath("data/customers.txt"), 1)
        Response.Write(f.ReadAll)
        f.Close
        
        
        set f = nothing
        set fs=nothing
    Else
        Response.Write(Server.MapPath("data/test.txt") + " does not exist.")
    End If

    Server.Execute("error.asp")

%>



</body>

</html>