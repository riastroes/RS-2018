<!DOCTYPE html>
<html>

<body>

    <%
    dim fs, f, f2, f3
    
    set fs=Server.CreateObject("Scripting.FileSystemObject")
    

    If (fs.FileExists(Server.MapPath("data/test.txt")))=true Then
        Set f=fs.GetFile(Server.MapPath("data/test.txt"))
        Response.Write("<br/>" & "File name: " & f.Name)
        Response.Write("<br/>" & "File created: " & f.DateCreated)
        Response.Write("<br/>" & "File type: " & f.Type)
        Response.Write("<br/>" & "File type: " & f.Size)
        Response.Write("<br/>" & "File attributes: " & f.Attributes)
        Response.Write("<br/>" & "File modified: " & f.DateLastModified)
        set f = nothing

        set f2 = fs.OpenTextFile(Server.MapPath("data/testa.txt"), 8,true)
        f2.WriteLine("This text will be added to the end of file")
        f2.Close

        set f3 = fs.OpenTextFile(Server.MapPath("data/testa.txt"), 1)
        Response.Write(f3.ReadAll)
        f3.Close
        
        set ts=nothing
        
        set f2 = nothing
        set f3 = nothing
        set fs=nothing
    Else
        Response.Write(Server.MapPath("data/test.txt") + " does not exist.")
    End If

    Server.Execute("error.asp")

%>



</body>

</html>