<!DOCTYPE html>
<html>
<style>
    td {
        padding: 10px;
    }
</style>

<body>
    <h1>Member Account</h1>

    <%
    dim user
    dim useremail
    dim userpassword
    dim show
    dim msg
    dim ischecked

    set user = Request.Form("inlogname")
    set useremail = Request.Form("inlogemail")
    set userpassword = Request.Form("inlogpassword")
    set show = Request.Form("inlogshow")
    ischecked = False

    If StrComp(show,"yes") =0 Then
        Response.write("<br/>Name:       " & user)
        Response.write("<br/>Email:      " & useremail)
        Response.write("<br/>Password:   " & userpassword)
        Response.write("<br/>")
    End If

    dim fs, f, pw

    If user <> "" Then
        If useremail <> "" And InStr(useremail,"@")>0  Then
            If userpassword <> "" And Len(userpassword)>=5 Then

                set fs=Server.CreateObject("Scripting.FileSystemObject") 
                If fs.FileExists(Server.MapPath("data/" & useremail & "/" & user & ".txt")) = True Then
                    set f= fs.OpenTextFile(Server.MapPath("data/" & useremail & "/" & user & ".txt"),1,false)
                    pw = CStr(f.ReadLine)
                    
                    If StrComp(pw, userpassword) = 0 Then
                        If StrComp(show,"yes") =0 Then
                            Response.write( "<br/>Welcome " & user)
                            Response.write( "<br/>Have Fun designing a DUET-pattern!")
                        Else
                            msg = "<br/>Welcome " & user & "<br/>Have Fun designing a DUET-pattern!"
                        End If
                        ischecked = True
                    Else 
                        If StrComp(show,"yes") =0 Then
                            Response.write("<br/>" & user & " " & useremail & " " & pw1 & " is a member")
                            Response.write("<br/>but " & pw & " is not a valid password.")
                        Else
                            msg = "Sorry, this password is unknown! Try again."
                        End If
                    End If
                    f.close
                    set f = nothing
                    set fs = nothing
                Else
                    If StrComp(show,"yes") =0 Then
                        Response.write("<br/>" & user & " " & useremail & " " & userpassword & " is not a member.")
                    Else
                        msg ="This member is unknown, fill in the registration form."
                    End If
                End If

            Else
                'no password
                If StrComp(show,"yes") =0 Then
                        Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a valid password.")
                Else
                    msg ="This is not a valid password."
                End If
                
            End If 
        Else
            'no email
            If StrComp(show,"yes") =0 Then
                        Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a valid emailaddress.")
            Else
                msg ="This is not a valid emailaddress."
            End If
        End If 
    Else
        'no name
        If StrComp(show,"yes") =0 Then
            Response.write("<br/>" & user & " " & useremail & " " & userpassword & " has not a name.")
        Else
            msg ="This is not a valid name."
        End If
    End If 
msg = "<br/>"  & msg 
If ischecked = True Then
    Response.redirect("index.asp")
Else
    Response.write("You have no access!" & msg)
End If
%>


</body>

</html>