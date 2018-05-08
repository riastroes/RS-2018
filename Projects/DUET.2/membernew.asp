<!DOCTYPE html>
<html>
<style>
    td {
        padding: 10px;
    }
</style>

<body>
    <h1>Member Create Account</h1>

    <%
    dim user
    dim useremail
    dim userpassword

    set user = Request.Form("inname")
    set useremail = Request.Form("inemail")
    set userpassword = Request.Form("inpassword")
    

    dim fs, fo, f

    If user <> "" Then
        If useremail <> "" Then
            If userpassword <> "" Then

                set fs=Server.CreateObject("Scripting.FileSystemObject") 
                If fs.FolderExists(Server.MapPath("data/" & useremail)) = True Then
                    Response.write("<br/>Emailaddress already exits.")
                Else
                    set fo = fs.CreateFolder(Server.MapPath("data/" & useremail))
                    set f = fo.CreateTextFile(user & ".txt",true)
                    f.writeLine(userpassword)

                    f.Close 
                    set f = nothing
                    set fo = nothing 
                    set fs = nothing
                End If

            Else
                'no password
                Response.write("User password is not valid")
            End If 
        Else
            'no email
            Response.write("User email is not valid")
        End If 
    Else
        'no name
        Response.write("User name is not valid")
    End If 
    

    Server.Execute("error.asp")
%>


</body>

</html>