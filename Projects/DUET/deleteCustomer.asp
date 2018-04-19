<!DOCTYPE html>
<html>

<body>
<h1>Member Administration</h1>

<%
dim fs, fo, f
dim  useremail

    set useremail = Request.Form("inemail")
        
    If useremail <> ""  Then
        set fs=Server.CreateObject("Scripting.FileSystemObject")  
        If fs.FolderExists(Server.MapPath("data/" & useremail)) = true Then
            fs.DeleteFolder(Server.MapPath("data/" & useremail))
            Response.write("Your designs are deleted: " & useremail)
            call listMembers()
        Else
            Response.write("folder " & useremail & " is unknown.")
        End If

        set fo=nothing
        set fs=nothing
    End If

sub listMembers()
    dim fs, folderdata
    set fs=Server.CreateObject("Scripting.FileSystemObject")  
    set folderdata=fs.GetFolder(Server.MapPath("data"))

    for each x in folderdata.SubFolders
    'Print the name of all subfolders in the test folder
        Response.write(x.Name & "<br>")
    next

    set folderdata = nothing
    set fs=nothing

end sub
 
%>

</body>

</html>