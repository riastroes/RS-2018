







<!DOCTYPE html>
<html>

<body>
<h1>Member Administration</h1>
<div id="divinlog">
    <form action="createCustomer.asp"  runat="server" method="post">
        <input type="text" id="inname" name="inname" required>
        <input type="text" id="inemail" name="inemail" required>
        <input type="text" id="inpassword" name="inpassword" required>
        <input type="submit" value="login">
    </form>
</div>

<div id="divdelete">
        <form action="deleteCustomer.asp"  runat="server" method="post">
            <input type="text" id="inemail" name="inemail" required>
            <input type="submit" value="delete">
        </form>
    </div>
<%

dim user, useremail, userpassword

    set user = Request.Form("inname")
    set useremail = Request.Form("inemail")
    set userpassword = Request.Form("inpassword")

    
If user <> ""  Then
    If user <> "Ria Stroes" Then
        call newMember(user, useremail)
    End if
        
End If

If user = "Ria Stroes" Then
    call listMembers()
End if





sub newMember(user, useremail)
    dim fs, fo
    set fs=Server.CreateObject("Scripting.FileSystemObject")  
    If fs.FolderExists(Server.MapPath("data/" & useremail)) = true Then
        Response.Write("welcome " & user & "</br>")
        
    Else
        If InStr(useremail,"@") Then
            set fo = fs.createFolder(Server.MapPath("data/" & useremail)) 
        Else
            Response.Write("Sorry! wrong emailaddress")
        End if
        
    End If

    set fo=nothing
    set fs=nothing
end sub

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